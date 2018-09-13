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
        'used' => [
            'Stock_Number',
            'Sale_Price',
            'NADA',
            'Year',
            'Make',
            'Model',
            'CPO',
            'Exterior_Color',
            'PKG.',
            'Miles',
            'Engine',
            'VIN',
            'Dealer_Notes',
            'Previous_Owner',
            'Images',
            'Passengers',
        ],
        'new' => [
            'Stock_Number',
            'Scheduled',
            'Sold',
            'Year',
            'MSRP',
            'Sale_Price_W_Rebate',
            'Make',
            'Model',
            'PKG.',
            'Exterior_Color',
            'VIN',
            'Dealer_Notes',
            'Images',
            'Passengers',
        ],
        'carforsale' => [
            'CarsForSaleDealerID',
            'NewUsed',
            'VIN',
            'StockNumber',
            'Make',
            'Model',
            'ModelYear',
            'Trim/Package',
            'BodyStyle',
            'Miles',
            'Engine',
            'Cylinders',
            'FuelType',
            'Transmission',
            'Price',
            'ExteriorColor',
            'InteriorColor',
            'Options',
            'Description',
            'PhotoURLs',
        ],
    ],
    'inventory' => [
        'prefix' => 'inv_',
        'folder' => 'inventory',
    ],
];
