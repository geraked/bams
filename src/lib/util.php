<?php

function test_input($data)
{
    if (!isset($data))
        return null;
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function completeUrl($server, $callName, $queryString = '')
{
    $rawUrl = $server['domain'];
    $secret = $server['secret'];
    $checkSum = sha1($callName . $queryString . $secret);
    if (!empty($queryString)) {
        $queryString .= '&';
    }
    $url = 'https://' . $rawUrl . '/bigbluebutton/api/';
    $url .= $callName . '?' . $queryString . 'checksum=' . $checkSum;
    return htmlspecialchars($url);
}

function getChildNodeValue($arr, $name)
{
    foreach ($arr as $n) {
        if (strtolower($n->nodeName) == strtolower($name)) {
            return $n->nodeValue;
        }
    }
}

function login_require()
{
    $fname = basename($_SERVER["SCRIPT_FILENAME"], '.php');
    $match = preg_match('/login/i', $fname);
    if ($match && isset($_SESSION['user']) && !empty($_SESSION['user'])) {
        header('Location: ' . URL);
    } else if ((!isset($_SESSION['user']) || empty($_SESSION['user'])) && !$match) {
        header('Location: ' . URL . 'logout.php');
    }
}

function getUser($username)
{
    foreach (USERS as $u) {
        if ($u['username'] == $username) {
            return $u;
        }
    }
    return null;
}
