<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Specifications;
use App\Models\SubCategory;
use App\Models\Settings;
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
    $products = Product::all()
        ->take(8)
        ->sortByDesc('views')
        ->values();

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


Route::get('/settings', function () {
    $settings = Settings::first();
    return response()->json($settings);
})->name('settings');

Route::get('/product/{product}', function ($product) {
    $product = Product::where('id', $product)->first();
    if (!session()->has('product_' . $product->id)) {
        $product->views = $product->views + 1;
        $product->save();
        session()->put('product_' . $product->id, true);
    }
    $subcategory = SubCategory::where('id', $product->subcategory_id)->first();
    $category = Category::where('id', $subcategory->category_id)->first();
    foreach ($product->specifications as $key => $spec) {
        $specification = Specifications::where('key', $spec['key'])->first();
        $specifications = $product->specifications;
        $specifications[$key]['name'] = $specification->name;
        $product->specifications = $specifications;
    }
    return Inertia::render('product', compact('product', 'category', 'subcategory'));
})->name('product');

Route::get('/category/{category}', function ($category = null) {
    $is_nodes = false;
    $category = Category::where('id', $category)->first();
    $subcategories = SubCategory::where('category_id', $category->id)->get();
    $nodes = Node::whereIn('id', $subcategories->pluck('node_id'))->get();

    $products = Product::whereIn('subcategory_id', $subcategories->pluck('id'))
        ->paginate(10);
    $specifications_all = Specifications::all();
    if ($nodes->count() > 0) {
        $subcategories = $nodes;
        $subcategories_nodes = SubCategory::whereIn('node_id', $nodes->pluck('id'))->get();
        foreach ($subcategories as $subcategory) {
            $subcategory->products_count = $subcategory->products()->count();
        }
        $is_nodes = true;
    } else {
        foreach ($subcategories as $subcategory) {
            $subcategory->products_count = Product::where('subcategory_id', $subcategory->id)->count();
        }
    }

    return Inertia::render('category', compact('category', 'specifications_all', 'subcategories', 'products', 'is_nodes'));
})->name('category');

Route::get('/node/{node}', function ($node) {
    $is_nodes = false;
    $node = Node::where('id', $node)->first();
    $subcategories = SubCategory::where('node_id', $node->id)->get();

    foreach ($subcategories as $subcategory) {
        $subcategory->products_count = Product::where('subcategory_id', $subcategory->id)->count();
    }
    $specifications_all = Specifications::all();
    $category = $node;

    $products = Product::whereIn('subcategory_id', $subcategories->pluck('id'))
        ->paginate(10);

    return Inertia::render('category', compact('node', 'category', 'specifications_all', 'subcategories', 'products', 'is_nodes'));
})->name('node');
Route::get('/category/{category}/{subcategory}', function ($category, $subcategory) {
    $category = Category::where('id', $category)->first();
    $subcategory = SubCategory::where('id', $subcategory)->first();

    $products = Product::where('subcategory_id', $subcategory->id)->paginate(10);

    $filters = [];
    $groupedFilters = [];
    $specifications_all = Specifications::all();
    foreach ($products as $product) {
        foreach ($product->specifications as $spec) {
            $key = $spec['key'];
            $specification = Specifications::where('key', $key)->first();
            if (!isset($groupedFilters[$key])) {
                $groupedFilters[$key] = [
                    'key' => $key,
                    'name' => $specification->name,
                    'values' => []
                ];
            }
            if (!in_array($spec['value'], $groupedFilters[$key]['values'])) {
                $groupedFilters[$key]['values'][] = $spec['value'];
            }
        }
    }

    $filters = array_values($groupedFilters);
    return Inertia::render('products', compact('category', 'subcategory', 'products', 'filters', 'specifications_all'));
})->name('subcategory');
Route::get('/category/{category}/{subcategory}/filters', function ($category, $subcategory, Request $request) {
    $category = Category::where('id', $category)->first();
    $subcategory = SubCategory::where('id', $subcategory)->first();

    $query = Product::where('subcategory_id', $subcategory->id);

    foreach ($request->except('page') as $key => $value) {
        $query->whereJsonContains('specifications', [
            ['key' => $key, 'value' => $value]
        ]);
    }

    $perPage = 10;
    $page = (int)($request->page ?? 1);
    $products = $query->paginate($perPage);


    return response()->json([
        'data' => $products->items(),
        'total' => $products->total(),
        'per_page' => $perPage,
        'current_page' => $page,
        'specifications' => $specifications
    ]);
})->name('subcategory');

Route::get('/products', function () {
    return Inertia::render('products');
})->name('products');


Route::get('/search/{search}', function ($search) {
    $products = Product::where('name', 'like', '%' . $search . '%')->get();
    return response()->json($products);
})->name('search');


Route::get('/contacts', function () {
    return Inertia::render('contact');
})->name('contacts');

Route::get('/popular-products', function () {
    $popularProducts = Product::query()->limit(10)->get()->toArray();
    return response()->json($popularProducts);
});