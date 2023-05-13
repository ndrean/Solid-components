import { Route, Routes } from "@solidjs/router";

import Nav from "./components/nav";
import routes from "./routes";
import "./index.css";

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <For each={routes}>
          {({ href, component }) => <Route path={href} element={component} />}
        </For>
      </Routes>
    </div>
  );
}
