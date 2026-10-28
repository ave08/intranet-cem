
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration {
    public function up(): void {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('prenom')->nullable();
            $table->date('date_naissance')->nullable();
            $table->string('sexe', 10)->nullable();
            $table->string('email')->unique()->nullable(); // Ajout de unique() pour la sécurité
            $table->string('telephone', 30)->nullable();
            $table->string('matricule')->nullable();
            $table->string('categorie')->nullable();
            $table->string('fonction')->nullable();
            $table->date('date_embauche')->nullable();
            $table->date('date_debauche')->nullable();
            
            // Foreign Keys
            $table->unsignedBigInteger('manager_id')->nullable();
            $table->unsignedBigInteger('service_id')->nullable();
            
            $table->string('statut')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken(); // password_temp varchar(100)
            
            $table->timestamps(); // created_at et updated_at
            $table->softDeletes(); // deleted_at
            
            // Booleans (tinyint(1))
            $table->boolean('must_change_password')->default(true);
            $table->boolean('email_verified')->default(false);
            $table->boolean('premiere_connexion_en_attente')->default(false);
            
            // Champs temporaires et profil
            $table->string('email_temp')->nullable();
            $table->string('matricule_temp')->nullable();
            $table->string('photo_profile')->nullable();
        });
    }

    public function down(): void {
        Schema::dropIfExists('users');
    }
};
