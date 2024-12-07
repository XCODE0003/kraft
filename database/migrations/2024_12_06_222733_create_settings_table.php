<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('work_time')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('address')->nullable();
            $table->string('name_company')->nullable();
            $table->string('full_name_company')->nullable();
            $table->integer('year_open_company')->nullable();
            $table->string('inn')->nullable();
            $table->string('kpp')->nullable();
            $table->string('orgn')->nullable();
            $table->string('mail_address')->nullable();
            $table->string('fakt_address')->nullable();
            $table->string('tax_system')->nullable();
            $table->timestamps();
        });
        DB::table('settings')->insert([
            'work_time' => '9:00 - 18:00',
            'phone' => '+7 (999) 999-99-99',
            'email' => 'info@example.com',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
