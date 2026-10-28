
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('libelle')->nullable();
            $table->text('code')->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('categorie')->nullable();
            $table->unsignedBigInteger('responsable_id')->nullable();
            
            $table->timestamps(); // created_at et updated_at
            $table->softDeletes(); // deleted_at

            // Foreign key vers lui-même
            $table->foreign('parent_id')->references('id')->on('services')->nullOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('services');
    }
};
