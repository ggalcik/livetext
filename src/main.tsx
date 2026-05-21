import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LiveDataProvider } from "./context/LiveData";

createRoot(document.getElementById("root")!).render(
  <LiveDataProvider>
    <App />
  </LiveDataProvider>
);
