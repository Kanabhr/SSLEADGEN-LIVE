<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insurer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'is_active'];

    public function policies()
    {
        return $this->hasMany(Policy::class);
    }
}
