import { Route, Routes } from "@solidjs/router";

import Nav from "./components/nav";
import routes from "./components/routes";

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
