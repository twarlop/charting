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


// STILL NEED TO CHECK ALL THE AUTHENTICATION STUFF!

Route::get('/', 'HomeController@index')->name('home')->middleware(['web']);
Route::get('/user', 'HomeController@user')->middleware(['web']);

Auth::routes();

Route::get('/diagrams', 'DiagramController@index');
Route::post('/diagrams/{diagram}', 'DiagramController@update');

//register any route and bind it to the home, the home will make sure our vue app gets loaded
//this way, we don't need to add an extra route binding for each new url that can be loaded in the front
//we need this to allow a user to refresh a page in the browser...
//since that will trigger a *server* request to the url that was the currently active vue route
//you'd get a route not found, if you didn't bind that route, but it would exist in our vue app
Route::get('{any}', 'HomeController@index')->where('any', '.*')->middleware(['web']);