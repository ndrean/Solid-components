import { render } from "solid-js/web";
import { Router, Routes } from "@solidjs/router";

import Nav from "./components/nav";
import App from "./components/app.jsx";

render(
  () => (
    <Router>
      <Nav />
      <Routes>
        <App />
      </Routes>
      .{" "}
    </Router>
  ),
  document.getElementById("root")
);
