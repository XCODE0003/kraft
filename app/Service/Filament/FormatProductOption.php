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
                $node = $subcategory->node;
                if ($node) {
                    return [
                        $subcategory->id => $subcategory->name . ' - ' . $node->name
                    ];
                } else {
                    return [
                        $subcategory->id => $subcategory->name . ' - ' . $subcategory->category->name
                    ];
                }
            });
    }
}