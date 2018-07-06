<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('vin', 50)->unique();
            $table->string('type', 5)->nullable();
            $table->string('stock_number', 20)->nullable();
            $table->string('make', 50)->nullable();
            $table->string('model', 50)->nullable();
            $table->string('model_year', 5)->nullable();
            $table->string('trim', 50)->nullable();
            $table->string('body_style', 50)->nullable();
            $table->string('mileage', 20)->nullable();
            $table->string('engine_description', 100)->nullable();
            $table->string('cylinders', 50)->nullable();
            $table->string('fuel_type', 50)->nullable();
            $table->string('transmission', 100)->nullable();
            $table->string('price', 20)->nullable();
            $table->string('exterior_color', 100)->nullable();
            $table->string('interior_color', 100)->nullable();
            $table->text('option_text')->nullable();
            $table->text('description')->nullable();
            $table->text('images')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
}
