<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'category_id',
        'node_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function node()
    {
        return $this->belongsTo(Node::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'subcategory_id');
    }
}