<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['first_name' => 'ITHands', 'last_name' => 'Admin', 'email'  => 'admin@ithands.net', 'role_id' => 1, 'status' => Config::get('constants.status.active'), 'password' => bcrypt('gP~9gj(1U544Y*L')],
            ['first_name' => 'ITHands', 'last_name' => 'Dealer', 'email'  => 'dealer@ithands.net', 'role_id' => 2, 'status' => Config::get('constants.status.active'), 'password' => bcrypt('gP~9gj(3U595Y*L')],
        ];

        \App\User::insert($data);
    }
}
