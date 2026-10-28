import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import background from "../assets/background.png";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { errors, flash } = usePage().props as any;

  // LOGIN
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    router.post(
      "/login",
      {
        identifier,
        password,
      },
      {
        onError: () => {
          setError("Identifiants incorrects ou accès non validé.");
        },
      },
    );
  };

  // REDIRECTION VERS PENDING PAGE
  const handleFirstLogin = () => {
    router.visit("/pending");
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${background})`,
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
            <h2 className="text-2xl mb-2">Bienvenue</h2>
            <p className="text-gray-600">Connectez-vous à votre compte</p>
          </div>

          {/*  Messages */}
          {flash?.success && (
            <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 text-sm border border-green-200">
              {flash?.success}
            </div>
          )}
          {flash?.error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
              {flash?.error}
            </div>
          )}
          

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="identifier" className="block mb-2 text-gray-700">
                Votre Identifiant
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
                placeholder="Email ou matricule"
                required
              />
              {errors?.identifier && (
                <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Mot de passe"
              />
              {errors?.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md text-white font-medium hover:opacity-90"
              style={{ backgroundColor: "rgb(226, 0, 26)" }}
            >
              Se connecter
            </button>

            <button
              type="button"
              className="w-full py-3 rounded-md text-white font-medium hover:opacity-90"
              style={{ backgroundColor: "rgb(34, 197, 94)" }}
              onClick={handleFirstLogin}
            >
              Première connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
