<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AideController extends Controller
{
    public function index()
    {
        return Inertia::render('AidePage');
    }
}
