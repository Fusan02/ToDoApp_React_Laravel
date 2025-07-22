<?php

return [

    'paths' => [
        'api/*',
        'register',
        'login',
        'logout',
        'user',
        'sanctum/csrf-cookie',
    ],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_headers' => ['*'],
    'supports_credentials' => true
];

