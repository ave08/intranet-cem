<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tache;
use App\Models\Publication;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('TaskPage', [
            'tasks' => Tache::all()
        ]);
    }

    
    public function sidebar()
    {
        return Inertia::render('HomePage', [
            'tasks' => Tache::latest()->take(10)->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string'
        ]);

        Task::create([
            'title' => $request->title,
            'status' => 'pending'
        ]);

        return back()->with('success', 'Tâche ajoutée');
    }

    public function updateStatus(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->status = $request->status;
        $task->save();

        return back()->with('success', 'Statut mis à jour');
    }
}