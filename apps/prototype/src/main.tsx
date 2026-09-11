import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// The prototype consumes the published design-system stylesheet — tokens and
// every component's CSS — rather than redefining any of it locally.
import "@clickguard/ui/styles.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
