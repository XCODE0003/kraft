<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class WeekStat extends ChartWidget
{
    protected static ?string $heading = 'Статистика добавления товаров';

    protected function getData(): array
    {
        $periods = [
            '1 день' => now()->subDay(),
            '7 дней' => now()->subDays(7),
            '30 дней' => now()->subDays(30),
            '90 дней' => now()->subDays(90),
            '180 дней' => now()->subDays(180),
            '360 дней' => now()->subDays(360),
        ];

        $data = [];
        foreach ($periods as $label => $date) {
            $data[] = \App\Models\Product::where('created_at', '>=', $date)->count();
        }

        return [
            'datasets' => [
                [
                    'label' => 'Количество добавленных товаров',
                    'data' => $data,
                    'backgroundColor' => '#4CAF50',
                    'borderColor' => '#81C784',
                ],
            ],
            'labels' => array_keys($periods),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
