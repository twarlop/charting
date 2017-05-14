<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DiagramController extends Controller
{

    public function index()
    {

    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
        ]);

        return $request->all();
    }

}