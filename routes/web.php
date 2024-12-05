<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Product;
use App\Models\Node;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $products = Product::all()->take(8);
    $categories = Category::all();
    $subcategories = SubCategory::whereIn('category_id', $categories->pluck('id'))->get();
    foreach ($categories as $category) {
        $category->products_count = Product::whereIn('subcategory_id', $subcategories->where('category_id', $category->id)->pluck('id'))->count();
    }
    return Inertia::render('main', compact('products', 'categories'));
})->name('main');

Route::get('/catalog', function () {
    $categories = Category::all();
    foreach ($categories as $category) {
        $subcategories = SubCategory::where('category_id', $category->id)->get();

        $withNodes = $subcategories->whereNotNull('node_id');
        $withoutNodes = $subcategories->whereNull('node_id');

        $category->nodes = $withNodes
            ->groupBy('node_id')
            ->map(function ($subcategories, $nodeId) {
                return [
                    'node' => Node::find($nodeId),
                    'subcategories' => $subcategories->map(function ($subcategory) {
                        $subcategory->products_count = Product::where('subcategory_id', $subcategory->id)->count();
                        return $subcategory;
                    })
                ];
            })
            ->values();

        $category->simple_subcategories = $withoutNodes->map(function ($subcategory) {
            $subcategory->products_count = Product::where('subcategory_id', $subcategory->id)->count();
            return $subcategory;
        });
    }
    return Inertia::render('catalog', compact('categories'));
})->name('catalog');

Route::get('/product/{product}', function ($product) {
    $product = Product::where('id', $product)->first();
    $subcategory = SubCategory::where('id', $product->subcategory_id)->first();
    $category = Category::where('id', $subcategory->category_id)->first();
    return Inertia::render('product', compact('product', 'category', 'subcategory'));
})->name('product');

Route::get('/category/{category}', function ($category) {
    $category = Category::where('id', $category)->first();
    $subcategories = SubCategory::where('category_id', $category->id)->get();
    $products = Product::whereIn('subcategory_id', $subcategories->pluck('id'))->get();
    return Inertia::render('category', compact('category', 'subcategories', 'products'));
})->name('category');
Route::get('/category/{category}/{subcategory}', function ($category, $subcategory) {
    $category = Category::where('id', $category)->first();
    $subcategory = SubCategory::where('id', $subcategory)->first();
    $products = Product::where('subcategory_id', $subcategory->id)->get();

    $filters = [];
    $groupedFilters = [];

    foreach ($products as $product) {
        foreach ($product->specifications as $spec) {
            $key = $spec['key'];
            if (!isset($groupedFilters[$key])) {
                $groupedFilters[$key] = [
                    'key' => $key,
                    'name' => $spec['name'],
                    'values' => []
                ];
            }
            if (!in_array($spec['value'], $groupedFilters[$key]['values'])) {
                $groupedFilters[$key]['values'][] = $spec['value'];
            }
        }
    }

    $filters = array_values($groupedFilters);
    return Inertia::render('products', compact('category', 'subcategory', 'products', 'filters'));
})->name('subcategory');

Route::get('/products', function () {
    return Inertia::render('products');
})->name('products');
