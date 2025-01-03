<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class Stats extends ChartWidget
{
    protected static ?string $heading = 'Статистика товаров по подкатегориям';

    protected function getData(): array
    {
        $subcategories = \App\Models\SubCategory::withCount('products')
            ->having('products_count', '>', 0)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Количество товаров',
                    'data' => $subcategories->pluck('products_count')->toArray(),
                    'backgroundColor' => '#36A2EB',
                    'borderColor' => '#9BD0F5',
                ],
            ],
            'labels' => $subcategories->pluck('name')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'x' => [
                    'display' => false,
                ],
            ],
        ];
    }
}
