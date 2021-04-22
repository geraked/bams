<?php
session_start();
require_once('config.php');
require_once('lib/util.php');
login_require();
?>

<!doctype html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Bigbluebutton & Adobe Connect Monitoring System">
    <meta name="author" content="Geraked, Rabist">
    <title>BAMS</title>
    <link rel="icon" href="<?php echo URL; ?>images/icon.png" type="image/png">

    <link id="boot-ltr" href="<?php echo URL; ?>plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link id="boot-rtl" href="<?php echo URL; ?>plugins/bootstrap/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo URL; ?>plugins/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="<?php echo URL; ?>css/style.css?v=<?php echo VERSION; ?>">
</head>

<body>