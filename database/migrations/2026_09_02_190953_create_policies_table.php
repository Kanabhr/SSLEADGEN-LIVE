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
        Schema::create('policies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->string('policy_number');
            $table->foreignId('insurer_id')->nullable()->constrained()->nullOnDelete();
            $table->string('cover_type')->nullable();
            $table->decimal('sum_assured', 12, 2)->nullable();
            $table->decimal('annual_premium', 10, 2)->nullable();
            $table->date('renewal_date')->nullable();
            $table->enum('status', ['Active', 'Inactive', 'Cancelled'])->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policies');
    }
};
