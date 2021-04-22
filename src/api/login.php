<?php
session_start();
require_once('../config.php');
require_once('../lib/util.php');

$dom = new DOMDocument('1.0', 'utf-8');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;

$response = $dom->createElement('response');
$returncode = $dom->createElement('returncode');
$response->appendChild($returncode);

try {
    $username = test_input($_POST['username'] ?? null);
    $password = test_input($_POST['password'] ?? null);

    if (!$username || !$password)
        throw new Exception("Error Processing Request", 1);

    $match = false;
    foreach (USERS as $u) {
        if ($u['username'] == $username) {
            if ($u['password'] == $password) {
                $_SESSION['user'] = $u['username'];
                $match = true;
            }
            break;
        }
    }

    if (!$match)
        throw new Exception("Wrong username or password", 2);

    $returncode->nodeValue = 'SUCCESS';
} catch (Exception $e) {
    $returncode->nodeValue = 'FAILED';
}

$dom->appendChild($response);
echo $dom->saveXML();
