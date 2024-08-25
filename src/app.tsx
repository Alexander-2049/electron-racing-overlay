import { createRoot } from "react-dom/client";
import Telemetry from "./web/telemetry";

const root = createRoot(document.getElementById("app"));
root.render(
  <h2>
    Hello from React!
    <Telemetry />
  </h2>
);
