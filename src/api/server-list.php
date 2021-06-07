<?php
require_once('initial.php');

$user = getUser($_SESSION['user']);
$acl = $user['acl'] ?? null;

$dom = new DOMDocument('1.0', 'utf-8');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;

$response = $dom->createElement('response');
$returncode = $dom->createElement('returncode', 'SUCCESS');
$response->appendChild($returncode);

foreach (SERVERS as $s) {
    if ($acl && !in_array($s['id'], $acl))
        continue;

    if (!isSiteAvailible('http://' . $s['domain']))
        continue;

    $server = $dom->createElement('server');
    $id = $dom->createElement('id', $s['id']);
    $type = $dom->createElement('type', $s['type']);
    $domain = $dom->createElement('domain', $s['domain']);
    $title = $dom->createElement('serverTitle', $s['title'] ?? '');

    $server->appendChild($id);
    $server->appendChild($type);
    $server->appendChild($domain);
    $server->appendChild($title);
    $response->appendChild($server);
}

$dom->appendChild($response);
echo $dom->saveXML();
