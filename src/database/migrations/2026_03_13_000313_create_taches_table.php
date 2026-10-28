
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('taches', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->date('date_debut')->nullable();
            $table->date('date_echeance')->nullable();
            $table->date('date_cloture')->nullable();
            $table->enum('statut',['a_faire','en_cours','terminee','annulee','en_retard'])->default('a_faire');
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('responsable_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('projet_id')->constrained('projets')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('taches');
    }
};
