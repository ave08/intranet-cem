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
        Schema::create('roles', function (Blueprint $table) {
            $table->id(); // bigint(20) UNSIGNED NOT NULL
            $table->string('name'); // varchar(255) NOT NULL
            $table->string('guard_name'); // varchar(255) NOT NULL (ex: 'web' ou 'api')
            $table->timestamps(); // created_at et updated_at
            
            // pour éviter les doublons accidentels
            $table->unique(['name', 'guard_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
