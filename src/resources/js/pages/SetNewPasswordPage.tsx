import { useState } from "react";
import { router} from "@inertiajs/react";

const BG_URL =
  "https://images.unsplash.com/photo-1592698765727-387c9464cd7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYW5raW5nJTIwZmluYW5jZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcyMTc0NzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080";

export default function SetNewPasswordPage({ email }: { email: string }) { 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

  
    router.post('/set-password', {
      email: email,
      password: newPassword,
      password_confirmation: confirmPassword
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url('${BG_URL}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div
          className="w-full max-w-md p-8 rounded-lg shadow-lg"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
          <div className="mb-8 text-center">
            <h2 className="text-2xl mb-2 font-semibold">
              Créer votre mot de passe
            </h2>
            <p className="text-gray-600">
              Définissez votre nouveau mot de passe pour accéder à votre compte
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block mb-2 text-gray-700">
                Nouveau mot de passe
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
                placeholder="Minimum 6 caractères"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-gray-700"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md text-white font-medium transition-opacity hover:opacity-90 focus:outline-none"
              style={{ backgroundColor: "rgb(226, 0, 26)" }}
            >
              Confirmer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
