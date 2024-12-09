<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('images');
            $table->integer('subcategory_id');
            $table->boolean('is_closeout')->default(false);
            $table->boolean('is_pickup')->default(false);
            $table->boolean('is_pickup_point')->default(false);
            $table->boolean('is_pickup_courier')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('views')->default(0);
            $table->json('specifications')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
