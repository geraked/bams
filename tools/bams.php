<?php

function cpu1()
{
    $fields = explode(' ', trim(str_ireplace('cpu', '', `grep 'cpu ' /proc/stat`)));
    $total = array_sum($fields);
    $idle = $fields[3];
    $utilization = (1 - $idle / $total) * 100;
    return round($utilization);
}

function cpu2()
{
    $cmd = `mpstat 1 1 | awk 'END{print 100-\$NF}'`;
    $ret = ($cmd < 100) ? $cmd : 99;
    return round($ret);
}

function loadAverage()
{
    $cores = (int) `cat /proc/cpuinfo | awk '/^processor/{print $3}' | wc -l`;
    preg_match('/average:([^,]+)/i', `uptime`, $r);
    $uptime = (float) trim($r[1]);
    $utilization = ($uptime / $cores) * 100;
    $ret = ($utilization < 100) ? $utilization : 99;
    return round($ret);
}

function ram()
{
    $cmd = `free -t | grep Mem | awk '{print $3/$2*100}'`;
    return round($cmd);
}

function disk()
{
    $cmd = `df -m /tmp | tail -1 | awk '{print $4}'`;
    return (int) $cmd;
}

echo cpu2() . '-' . ram() . '-' . disk();
