
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('piece_jointes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('publication_id')->constrained('publications')->cascadeOnDelete();
            $table->string('nom_fichier');
            $table->string('chemin_stockage');
            $table->string('type');
            $table->integer('taille');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('piece_jointes');
    }
};
