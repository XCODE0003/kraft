<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;

    protected $fillable = [
        'work_time',
        'phone',
        'email',
        'name_company',
        'year_open_company',
        'inn',
        'kpp',
        'orgn',
        'mail_address',
        'fakt_address',
        'full_name_company',
        'tax_system',

    ];
}
