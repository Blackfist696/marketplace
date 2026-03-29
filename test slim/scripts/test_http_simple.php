<?php
$urls = [
    'http://127.0.0.1:8080/api/products',
    'http://127.0.0.1:8080/api/home',
    'http://127.0.0.1:8080/',
    'http://127.0.0.1:8080/products'
];
foreach ($urls as $u) {
    echo "URL: $u\n";
    $ch = curl_init($u);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_NOBODY, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    $resp = curl_exec($ch);
    if ($resp === false) {
        echo 'CURL ERROR: ' . curl_error($ch) . "\n";
    } else {
        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($resp, 0, $header_size);
        $body = substr($resp, $header_size);
        echo "HTTP_HEADER:\n" . $header . "\n";
        echo "BODY_SNIPPET:\n" . substr($body,0,400) . "\n";
    }
    curl_close($ch);
    echo "---\n";
}
?>
