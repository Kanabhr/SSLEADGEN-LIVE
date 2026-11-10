<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Only proceed if clients table exists
        if (!Schema::hasTable('clients')) {
            return;
        }

        // First, fix any invalid datetime values in the clients table
        DB::statement("UPDATE clients SET created_at = NULL WHERE created_at = '0000-00-00 00:00:00'");
        DB::statement("UPDATE clients SET updated_at = NULL WHERE updated_at = '0000-00-00 00:00:00'");
        
        // Only update foreign keys on MySQL; SQLite doesn't support ALTER TABLE CONSTRAINT operations
        if (DB::getDriverName() === 'mysql') {
            Schema::table('clients', function (Blueprint $table) {
                // Check if the foreign key exists before dropping
                // Get the actual foreign key name from the database
                $foreignKeys = DB::select("
                    SELECT CONSTRAINT_NAME 
                    FROM information_schema.KEY_COLUMN_USAGE 
                    WHERE TABLE_SCHEMA = DATABASE() 
                    AND TABLE_NAME = 'clients' 
                    AND COLUMN_NAME = 'lead_source_id' 
                    AND REFERENCED_TABLE_NAME IS NOT NULL
                ");
                
                // Drop the foreign key if it exists
                if (!empty($foreignKeys)) {
                    $constraintName = $foreignKeys[0]->CONSTRAINT_NAME;
                    DB::statement("ALTER TABLE clients DROP FOREIGN KEY `{$constraintName}`");
                }
            });
            
            // Add new foreign key constraint pointing to lookup_values table
            Schema::table('clients', function (Blueprint $table) {
                $table->foreign('lead_source_id')
                      ->references('id')
                      ->on('lookup_values')
                      ->nullOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'mysql') {
            Schema::table('clients', function (Blueprint $table) {
                // Drop the new foreign key
                $table->dropForeign(['lead_source_id']);
                
                // Restore the old foreign key (if lead_sources table still exists)
                if (Schema::hasTable('lead_sources')) {
                    $table->foreign('lead_source_id')
                          ->references('id')
                          ->on('lead_sources')
                          ->nullOnDelete();
                }
            });
        }
    }
};
