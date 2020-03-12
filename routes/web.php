<?php

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

use App\Console\Commands\C6SitemapCommand;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return view('index');
});

Route::get('/shops', function () {
    return view('shops');
});
Route::get('/shops/{id}', function () {
    return view('shops');
})->where(['id' => '[0-9]+']);
Route::get('/shop/{id}', function () {
    return view('shop');
})->where(['id' => '[0-9]+']);
Route::get('/shop/{id}/product/{categoryId}/{modal?}', function () {
    return view('product');
})->where(['id' => '[0-9]+', 'categoryId' => '[0-9]+']);

Route::get('/cart', function () {
    return view('basket');
});

//Route::get('/proxy', function () {
//    $curl = curl_init();
//    curl_setopt($curl, CURLOPT_URL, 'https://maps.googleapis.com/maps/api/directions/json?origin=' . urlencode('вулиця Степана Бандери, 31, Рівне, Рівненська область, Україна, 33017') . '&waypoints=' . urlencode('вулиця Короленка, 1, Рівне, Рівненська область, Україна, 33017') . '&destination=' . urlencode('провулок Ігоря Волошина, 5, Рівне, Рівненська область, Україна, 33017') . '&avoid=highways&mode=driving&language=uk&key=AIzaSyDzXAzUwHGGt1msT_VUpU5te1GI2_iPLG0&sensor=false');
//    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, false);
//    $out = curl_exec($curl);
//    return $out;
//});


