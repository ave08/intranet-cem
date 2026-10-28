<?php

return [

  
'paths' => ['api/*', 'sanctum/csrf-cookie', 'inertia/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['*'], // Pour le développement sur Replit, '*' est le plus sûr
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,

  
];