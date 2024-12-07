<?php

namespace App\Service\Filament;

use App\Models\SubCategory;
use App\Models\Category;

class FormatProductOption
{
    public static function format()
    {
        return SubCategory::with('node')
            ->get()
            ->mapWithKeys(function ($subcategory) {
                return [

                    $subcategory->id => $subcategory->name . ' - ' . $subcategory->node?->name
                ];
            });
    }
}