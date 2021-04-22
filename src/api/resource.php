<?php
require_once('initial.php');

$dom = new DOMDocument('1.0', 'utf-8');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;

$response = $dom->createElement('response');
$returncode = $dom->createElement('returncode');
$response->appendChild($returncode);

try {
    $serverId = test_input($_GET['id'] ?? null);

    foreach (SERVERS as $s) {
        if ($s['id'] == $serverId) {
            $server = $s;
            break;
        }
    }

    if (!$serverId)
        throw new Exception("Error Processing Request", 1);

    $ext = ($s['type'] == BIGBLUEBUTTON) ? '.php' : '';
    $data = $dom->createElement('data', file_get_contents('http://' . $s['domain'] . '/bams' . $ext));
    $response->appendChild($data);
    $returncode->nodeValue = 'SUCCESS';
} catch (Exception $e) {
    $returncode->nodeValue = 'FAILED';
}

$dom->appendChild($response);
echo $dom->saveXML();
