// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.tsx",  // tous vos fichiers React TypeScript
    "./resources/**/*.ts",   // si vous avez des fichiers TS sans JSX
    "./resources/**/*.jsx",  // fichiers JSX éventuels
    "./resources/**/*.js",   // fichiers JS éventuels
    "./resources/views/**/*.blade.php", // si vous utilisez Blade avec Tailwind
  ],
  theme: {
    extend: {}, // ici vous pouvez ajouter vos couleurs, fonts, spacing, etc.
  },
  plugins: [], // ajoutez ici les plugins Tailwind si nécessaire
};