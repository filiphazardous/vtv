#!/usr/bin/php
<?php

const TARGET_DIR = './dist/img/';
const TARGET_FILE = './assetData.json';

$contentString = file_get_contents('./content.json');
$contentJson = json_decode($contentString, TRUE);

$includeAr = array();

recRemDir(TARGET_DIR);
mkdir(TARGET_DIR, 0755, TRUE);

foreach ($contentJson['includes']['Asset'] as $asset) {
    //print_r($asset);
    $url = 'http:' . $asset['fields']['file']['url'];
    $fileName = $asset['fields']['file']['fileName'];
    $includeAr[$asset['sys']['id']] = $asset['fields'];

    downloadAsset($url, $fileName);
}

file_put_contents(TARGET_FILE, json_encode($includeAr, JSON_PRETTY_PRINT));

function recRemDir($dir) {
    if (is_dir($dir) && $dir != '/') {
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
                if (is_dir($dir . '/' . $file)) {
                    recRemDir($dir . '/' . $file);
                }
                else {
                    unlink($dir . '/' . $file);
                }
            }
        }
        rmdir($dir);
    }
}

function downloadAsset($url, $fileName) {

    $saveTo = TARGET_DIR . $fileName;

    $fp = fopen($saveTo, 'w+');
    if ($fp === FALSE) {
        throw new Exception('Could not open: ' . $saveTo);
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    curl_exec($ch);

    if (curl_errno($ch)) {
        throw new Exception(curl_error($ch));
    }

    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    if ($statusCode !== 200) {
        throw new Exception('Download failed with code: ' . $statusCode);
    }
}
