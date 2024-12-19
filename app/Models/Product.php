<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'images',
        'subcategory_id',
        'quantity',
        'is_closeout',
        'is_pickup',
        'is_pickup_point',
        'is_pickup_courier',
        'is_active',
        'specifications',
        'views',
    ];


    protected $casts = [
        'images' => 'array',
        'specifications' => 'array',
    ];

    public function subcategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function node()
    {
        return $this->hasOneThrough(
            Node::class,
            SubCategory::class,
            'id',
            'id',
            'subcategory_id',
            'node_id'
        );
    }

    public function category()
    {
        return $this->hasOneThrough(
            Category::class,
            SubCategory::class,
            'id',
            'id',
            'subcategory_id',
            'category_id'
        );
    }
}