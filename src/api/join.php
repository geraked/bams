<?php
include 'initial.php';

$dom = new DOMDocument('1.0', 'utf-8');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;

$response = $dom->createElement('response');
$returncode = $dom->createElement('returncode');
$response->appendChild($returncode);

try {
    $serverId = test_input($_GET['serverId'] ?? null);
    $meetingId = test_input($_GET['meetingId'] ?? null);
    $password = test_input($_GET['password'] ?? null);
    $name = urlencode(test_input($_GET['name'] ?? null));
    $server = null;

    foreach (SERVERS as $s) {
        if ($s['id'] == $serverId) {
            $server = $s;
            break;
        }
    }

    if (!$serverId || !$meetingId || !$password || !$name || !$server)
        throw new Exception("Error Processing Request", 1);

    $qs = 'fullName=' . $name . '&meetingID=' . $meetingId . '&password=' . $password;
    $url = completeUrl($server, 'join', $qs);
    $join = $dom->createElement('join', $url);
    $response->appendChild($join);
    $returncode->nodeValue = 'SUCCESS';
} catch (Exception $e) {
    $returncode->nodeValue = 'FAILED';
}

$dom->appendChild($response);
echo $dom->saveXML();
