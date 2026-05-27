<?php

return [
    'base_path' => '/project02',
    'display_error_details' => filter_var(getenv('APP_DEBUG') ?: '1', FILTER_VALIDATE_BOOL),
];
