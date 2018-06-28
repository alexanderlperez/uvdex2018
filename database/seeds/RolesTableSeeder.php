<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['title'    => 'Super Admin', 'code'  => 'super_admin'],
            ['title'    => 'Dealer', 'code'  => 'dealer'],
        ];

        \App\Models\Role::insert($data);
    }
}
