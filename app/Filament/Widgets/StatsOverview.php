<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Product;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $totalProducts = Product::count();
        
        $totalSpace = disk_total_space('/');
        $freeSpace = disk_free_space('/');
        $usedSpace = $totalSpace - $freeSpace;
        $diskUsagePercent = round(($usedSpace / $totalSpace) * 100, 1);

        $memoryLimit = $this->getMemoryInBytes(ini_get('memory_limit'));
        $memoryUsage = memory_get_usage(true);
        
        return [
            Stat::make('Всего товаров', number_format($totalProducts))
                ->description('Общее количество товаров в базе')
                ->color('success'),

            Stat::make('Использование диска', $this->formatBytes($usedSpace) . ' / ' . $this->formatBytes($totalSpace))
                ->description("Занято {$diskUsagePercent}%")
                ->color($diskUsagePercent > 90 ? 'danger' : 'success'),

            Stat::make('Память PHP', $this->formatBytes($memoryUsage))
                ->description("Лимит памяти: " . $this->formatBytes($memoryLimit))
                ->color('success'),
        ];
    }

    private function getMemoryInBytes($val)
    {
        $val = trim($val);
        $last = strtolower($val[strlen($val)-1]);
        $val = (int)$val;
        
        switch($last) {
            case 'g':
                $val *= 1024;
            case 'm':
                $val *= 1024;
            case 'k':
                $val *= 1024;
        }

        return $val;
    }

    private function formatBytes($bytes)
    {
        if ($bytes <= 0) return '0 B';
        
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $pow = floor(log($bytes) / log(1024));
        $pow = min($pow, count($units) - 1);
        
        return round($bytes / (1024 ** $pow), 2) . ' ' . $units[$pow];
    }
}
