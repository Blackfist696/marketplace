<?php
$u = 'http://127.0.0.1:8080/';
$ch = curl_init($u);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
$r = curl_exec($ch);
if ($r === false) {
    echo 'CURL ERROR: ' . curl_error($ch) . "\n";
} else {
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $h = substr($r, 0, $header_size);
    $b = substr($r, $header_size);
    echo "HEADERS:\n" . $h . "\nBODY (first 1000 chars):\n" . substr($b,0,1000) . "\n";
}
curl_close($ch);
?>
