<?php

namespace App\Service\Filament;

use App\Models\Subcategory;
use App\Models\Category;

class FormatProductOption
{
    public static function format()
    {
        return Subcategory::with('category')
            ->get()
            ->mapWithKeys(function ($subcategory) {
                return [
                    $subcategory->id => $subcategory->name . ' - ' . $subcategory->category->name
                ];
            });
    }
}
