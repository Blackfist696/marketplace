<?php
$urls = [
    'http://127.0.0.1:8080/api/products',
    'http://127.0.0.1:8080/api/home',
    'http://127.0.0.1:8080/',
    'http://127.0.0.1:8080/products'
];
foreach ($urls as $u) {
    echo "URL: $u\n";
    $opts = ['http' => ['method' => 'GET', 'ignore_errors' => true]];
    $ctx = stream_context_create($opts);
    $res = @file_get_contents($u, false, $ctx);
    echo "HTTP_HEADERS:\n";
    var_dump(isset($http_response_header) ? $http_response_header : null);
    echo "BODY_SNIPPET:\n";
    var_dump($res ? substr($res, 0, 400) : $res);
    echo "\n---\n";
}
?>
