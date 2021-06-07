<?php
require_once('meta.php');

// To show debug errors change the number to 1
ini_set('display_errors', 0);

// Type the web site URL. Putting a trailing slash at the end is necessary
define('URL', 'http://localhost/bams/');

// Determine the servers 
const SERVERS = [
    [
        'id'        => '1',
        'type'      => BIGBLUEBUTTON,
        'domain'    => 'vc1.example.com',
        'secret'    => 'xxxxxxxxxx',
        'title'     => 'Server 1',
    ],
    [
        'id'        => '2',
        'type'      => ADOBE_CONNECT,
        'domain'    => 'vc2.example.com',
        'login'     => 'xxxxxxxxxx',
        'password'  => 'xxxxxxxxxx',
        'title'     => 'Server 2',
    ],
];

// Determine the users
const USERS = [
    [
        'username'  => 'admin',
        'password'  => 'admin',
        'name'      => 'admin',
    ],
    [
        'username'  => 'usr1',
        'password'  => 'usr1',
        'name'      => 'User 1',
        'acl'       => ['1',],
    ],
];
