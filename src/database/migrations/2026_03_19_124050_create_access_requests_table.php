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
        Schema::create('access_requests', function (Blueprint $table) {
            $table->id();

            // Référence à l'user qui fait la demande
            $table->unsignedBigInteger('user_id');

            // Données temporaires saisies lors de première connexion
            $table->string('nom_temp')->nullable();
            $table->string('prenom_temp')->nullable();
            $table->enum('sexe',['Masculin','Féminin']);
            $table->string('email_temp')->nullable();
            $table->string('telephone_temp')->nullable();
            $table->string('matricule_temp')->nullable();

            // Statut de la demande : pending, approved, rejected
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');

            $table->timestamps();

            // Foreign key vers users
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acces_requests');
    }
};
