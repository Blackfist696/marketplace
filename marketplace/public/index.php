<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../app/autoload.php';

$app = require_once __DIR__ . '/../config/routes.php';

$app->run();