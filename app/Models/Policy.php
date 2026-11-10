<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Policy extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'policy_number',
        'insurer_id',
        'cover_type',
        'sum_assured',
        'annual_premium',
        'renewal_date',
        'status',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function insurer()
    {
        return $this->belongsTo(Insurer::class);
    }
}
