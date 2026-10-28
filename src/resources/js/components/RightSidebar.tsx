import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckSquare } from "lucide-react";
import { usePage, Link } from "@inertiajs/react";

export function RightSidebar() {
  const { props } = usePage() as any;

  const tasks = props?.Tache || [];

  return (
    <aside className="w-80 space-y-4">

      {/* TASKS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-red-600" />
            Tâches récentes
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">

          {tasks.length === 0 && (
            <p className="text-sm text-gray-500">
              Aucune tâche disponible
            </p>
          )}

          {tasks.slice(0, 6).map((task: any) => (
            <div
              key={task.id}
              className="p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-900">
                  {task.title}
                </p>

                {/* STATUS */}
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.status === "done"
                      ? "bg-green-100 text-green-600"
                      : task.status === "in_progress"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              {task.description && (
                <p className="text-xs text-gray-500 mt-1">
                  {task.description}
                </p>
              )}

              {task.date_echeance && (
                <p className="text-xs text-gray-400 mt-1">
                  Deadline : {task.date_echeance}
                </p>
              )}
            </div>
          ))}

          {/* LINK TO TASK PAGE */}
          <Link
            href="/tasks"
            className="block text-center text-sm text-red-600 hover:underline mt-2"
          >
            Voir toutes les tâches →
          </Link>

        </CardContent>
      </Card>

    </aside>
  );
}