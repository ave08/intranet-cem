import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import background from "../assets/background.png";

export default function PendingPage() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [sexe, setSexe] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [matricule, setMatricule] = useState("");
  const [error, setError] = useState("");

  const { errors, flash } = usePage().props as any;

  // Envoi demande d'accès
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.post(
      "/login/access-request",
      {
        nom_temp: nom,
        prenom_temp: prenom,
        sexe,
        email_temp: email,
        telephone_temp: phone,
        matricule_temp: matricule,
      },
      {
        onError: (err) => {
            console.log("Erreurs reçues de Laravel :", err)},
      }
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url('${background}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div
          className="w-full max-w-md p-8 rounded-lg shadow-lg"
          style={{ backgroundColor: "white" }}
        >
          <div className="mb-8 text-center">
            <h2 className="text-2xl mb-2">Demande d'accès</h2>
            <p className="text-gray-600">
              Veuillez remplir vos informations pour accéder à la plateforme
            </p>
          </div>

          {/* Messages */}
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

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Nom */}
            <div>
              <label className="block mb-2 text-gray-700">Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-3 border rounded-md"
                required
              />
              {errors?.nom_temp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nom_temp}
                </p>
              )}
            </div>

            {/* Prénom */}
            <div>
              <label className="block mb-2 text-gray-700">Prénom</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full px-4 py-3 border rounded-md"
                required
              />
              {errors?.prenom_temp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.prenom_temp}
                </p>
              )}
            </div>

            {/* Sexe */}
            <div>
              <label className="block mb-2 text-gray-700">Sexe</label>
              <select
                value={sexe}
                onChange={(e) => setSexe(e.target.value)}
                className="w-full px-4 py-3 border rounded-md"
                required
              >
                <option value="">-- Choisir --</option>
                <option value="Masculin">Masculin</option>
                <option value="Feminin">Féminin</option>
              </select>
              {errors?.sexe && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sexe}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-md"
                required
              />
              {errors?.email_temp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email_temp}
                </p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label className="block mb-2 text-gray-700">Téléphone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border rounded-md"
                required
              />
              {errors?.telephone_temp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.telephone_temp}
                </p>
              )}
            </div>

            {/* Matricule */}
            <div>
              <label className="block mb-2 text-gray-700">Matricule</label>
              <input
                type="text"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                className="w-full px-4 py-3 border rounded-md"
                required
              />
              {errors?.matricule_temp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.matricule_temp}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md text-white font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "rgb(34, 197, 94)" }}
            >
              Envoyer la demande
            </button>
          </form>

          {/* 🔹 Info */}
          <p className="text-xs text-gray-400 text-center mt-6">
            Votre demande sera vérifiée par un administrateur
          </p>
        </div>
      </div>
    </div>
  );
}