import { useState } from "react";
import { router } from "@inertiajs/react";

export default function PasswordChangePage() { // N'oubliez pas le "default" !
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Avec Inertia, on envoie les données au contrôleur Laravel
    router.post('/change-password', {
      current_password: currentPassword,
      new_password: newPassword
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1592698765727-387c9464cd7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYW5raW5nJTIwZmluYW5jZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcyMTc0NzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay to make text more readable */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div
          className="w-full max-w-md p-8 rounded-lg shadow-lg"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
          <div className="mb-8 text-center">
            <h2 className="text-2xl mb-2">Bienvenue</h2>
            <p className="text-gray-600">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="currentPassword"
                className="block mb-2 text-gray-700"
              >
                Votre mot de passe
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  ["--tw-ring-color" as any]: "rgb(226, 0, 26)",
                }}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block mb-2 text-gray-700">
                Votre nouveau mot de passe
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md text-white font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: "rgb(226, 0, 26)",
                ["--tw-ring-color" as any]: "rgb(226, 0, 26)",
              }}
            >
              Confirmer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
