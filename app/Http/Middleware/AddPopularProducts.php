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
        $popularProducts = Product::query()->limit(10)->get()->toArray();
        $request->attributes->set('popularProducts', $popularProducts);
        return $next($request);
    }
}