<?php
namespace App\Http\Controllers;

use App\Models\Projet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjetController extends Controller
{
    public function index()
    {
        return Projet::with('taches')->get();
    }

    public function store(Request $request)
    {
        return Projet::create($request->all());
    }

    public function show(Projet $projet)
    {
        return $projet;
    }

    public function update(Request $request, Projet $projet)
    {
        $projet->update($request->all());
        return $projet;
    }

    public function destroy(Projet $projet)
    {
        $projet->delete();
        return response()->json(['deleted'=>true]);
    }
}
