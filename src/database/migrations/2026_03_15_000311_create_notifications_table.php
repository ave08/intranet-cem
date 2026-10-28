
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();

            // destinataire
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // type de notification
            $table->string('type'); 
            // like, comment, dislike, post, access_request, approval

            // message affiché
            $table->text('message');


            // lien optionnel (redirect frontend)
            $table->string('lien')->nullable();

            // lecture
            $table->boolean('est_lue')->default(false);
            $table->json('data')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('notifications');
    }
};
