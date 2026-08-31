import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LiveDataProvider } from "./context/LiveData";
import ObsPage from "./features/ObsSource/ObsPage.tsx";

const isObsPage = window.location.pathname.toLowerCase() === "/obs";

createRoot(document.getElementById("root")!).render(
  isObsPage ? (
    <ObsPage />
  ) : (
    <LiveDataProvider>
      <App />
    </LiveDataProvider>
  )
);
