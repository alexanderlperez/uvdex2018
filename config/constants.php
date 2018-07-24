<?php

/**
 * constants.php
 * define the website constants
 */


return [

    'site' => [
        'name' => 'UVDex',
        'email' => 'frontdesk@uvdex.com',
        'phone'=>'444-444-4444',
    ],
    'role' => [
        'super_admin' => 1,
        'dealer' => 2,
    ],
    'status' => [
        'active' => 1,
        'inactive' => 0,
    ],
    'body_type' => [
        'car' => [
            'coupe',
            'sedan',
            'hatchback'
        ],
        'suv' => [
            'suv',
        ],
        'truck' => [
            'pickup truck'
        ],
    ],
    'headers' => [
        'VIN',
        'Type',
        'StockNumber',
        'Make',
        'Model',
        'ModelYear',
        'Trim',
        'BodyStyle',
        'Mileage',
        'EngineDescription',
        'Cylinders',
        'FuelType',
        'Transmission',
        'Price',
        'ExteriorColor',
        'InteriorColor',
        'OptionText',
        'Description',
        'images',
    ]
];
