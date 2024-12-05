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
            $table->text('description');
            $table->json('images');
            $table->foreignId('subcategory_id')
                ->constrained('subcategories')
                ->onDelete('cascade');
            $table->integer('quantity');
            $table->boolean('is_closeout')->default(false);
            $table->boolean('is_pickup')->default(false);
            $table->boolean('is_pickup_point')->default(false);
            $table->boolean('is_pickup_courier')->default(false);
            $table->boolean('is_active')->default(true);
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