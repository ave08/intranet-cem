
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('contenu')->nullable();
            $table->string('type')->nullable();
            $table->enum('statut',['en_attente','valide','refuse'])->default('en_attente');
            $table->enum('visibilite',['global','direction','service'])->default('global');
            $table->timestamp('date_publication')->nullable();
            $table->timestamp('date_validation')->nullable();
            $table->foreignId('auteur_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('service_id')->nullable()->constrained();
            $table->foreignId('direction_id')->nullable()->constrained('services');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('publications');
    }
};
