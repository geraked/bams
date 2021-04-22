<?php
require_once('initial.php');
require_once('../lib/adobeconnect.php');

$user = getUser($_SESSION['user']);
$acl = $user['acl'] ?? null;

try {
    $id = test_input($_GET['id'] ?? null);
    $server = null;

    if (!$acl || in_array($id, $acl)) {
        foreach (SERVERS as $s) {
            if ($s['id'] == $id) {
                $server = $s;
                break;
            }
        }
    }

    if (!$id || !$server)
        throw new Exception("Error Processing Request", 1);

    $dom = new DOMDocument('1.0', 'utf-8');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;

    if ($server['type'] == BIGBLUEBUTTON) {
        $url = completeUrl($server, 'getMeetings');
        $dom->load($url);
        $meetings = $dom->getElementsByTagName('meeting');
        foreach ($meetings as $m) {
            $childs = $m->childNodes;
            $id = getChildNodeValue($childs, 'meetingid');
            $pass = getChildNodeValue($childs, 'moderatorpw');
            $qs = 'fullName=' . urlencode($user['name']) . '&meetingID=' . $id . '&password=' . $pass;
            $joinLink = $dom->createElement('join', completeUrl($server, 'join', $qs));
            $m->appendChild($joinLink);
        }
    } else if ($server['type'] == ADOBE_CONNECT) {
        $ac = new AdobeConnectClient($server['domain'], $server['login'], $server['password']);
        $ac = $ac->makeAuth();

        $response = $dom->createElement('response');
        $returncode = $dom->createElement('returncode', 'SUCCESS');
        $response->appendChild($returncode);

        foreach ($ac->getActiveMeetings()['report-active-meetings'] as $am) {
            $meeting = [
                'sco-id'                => $am['@attributes']['sco-id'],
                'active-participants'   => $am['@attributes']['active-participants'],
                'length-minutes'        => $am['@attributes']['length-minutes'],
                'name'                  => $am['name'],
                'url-path'              => 'http://' . $server['domain'] . $am['url-path'],
                'date-begin'            => substr($am['date-begin'], 0, 19),
            ];

            $row = $dom->createElement('meeting');
            foreach ($meeting as $key => $value) {
                $prop = $dom->createElement($key, $value);
                $row->appendChild($prop);
            }
            $response->appendChild($row);
        }

        $dom->appendChild($response);
    } else {
        throw new Exception("Undefined server type", 2);
    }

    echo $dom->saveXML();
} catch (Exception $e) {
    $dom = new DOMDocument('1.0', 'utf-8');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;

    $response = $dom->createElement('response');
    $returncode = $dom->createElement('returncode', 'FAILED');
    $response->appendChild($returncode);
    $dom->appendChild($response);
    echo $dom->saveXML();
}
