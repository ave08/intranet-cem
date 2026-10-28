import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./context/AppContext";
import "../css/index.css";
import "./bootstrap";

createInertiaApp({
  resolve: async(name) => {
    const pages = import.meta.glob("./pages/**/*.tsx"); // sans eager
    const page = await pages[`./pages/${name}.tsx`]();
    return page;
  },

  setup({ el, App, props }) {
    console.log("React demarre");
    createRoot(el).render(
      <AppProvider>
        <App {...props} />
      </AppProvider>
    );
  },

  progress: {
    color: "#29d",
  },
});
