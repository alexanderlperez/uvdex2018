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
            $table->integer('user_id')->unsigned()->index();
            $table->string('vin', 50)->default('');
            $table->string('type', 5)->default('');
            $table->string('stock_number', 20)->default('');
            $table->string('make', 50)->default('');
            $table->string('model', 50)->default('');
            $table->string('model_year', 5)->default('');
            $table->string('trim', 50)->default('');
            $table->string('body_style', 50)->default('');
            $table->string('body_type', 50)->default('');
            $table->string('mileage', 20)->default('');
            $table->string('engine_description', 100)->default('');
            $table->string('cylinders', 50)->default('');
            $table->string('fuel_type', 50)->default('');
            $table->string('transmission', 100)->default('');
            $table->string('price', 20)->default('');
            $table->string('exterior_color', 100)->default('');
            $table->string('interior_color', 100)->default('');
            $table->text('option_text')->nullable(FALSE);
            $table->text('description')->nullable(FALSE);
            $table->text('images')->nullable(FALSE);
            $table->string('passengers', 10)->default('');
            $table->string('scheduled', 50)->default('');
            $table->string('sold', 50)->default('');
            $table->string('msrp', 20)->default('');
            $table->string('rebate_price', 20)->default('');
            $table->string('nada', 20)->default('');
            $table->string('cpo')->default('');
            $table->string('code', 50)->default('');
            $table->string('previous_owner', 50)->default('');
            $table->timestamps();
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
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
