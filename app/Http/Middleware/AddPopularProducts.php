<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddPopularProducts
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $popularProducts = Product::query()
                ->orderBy('views', 'desc')
                ->limit(10)
                ->get()
                ->toArray();
            
            if (!empty($popularProducts)) {
                $request->attributes->set('popularProducts', $popularProducts);
            } else {
                $request->attributes->set('popularProducts', []);
            }
        } catch (\Exception $e) {
            $request->attributes->set('popularProducts', []);
        }

        return $next($request);
    }
}