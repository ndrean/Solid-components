import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";

import styles from "./App.module.css";
import Nav from "./components/nav";

import routes from "./components/routes";

export default function App() {
  return (
    <div class={styles.App}>
      <Nav />
      <Routes>
        <For each={routes}>
          {({ href, component }) => <Route path={href} element={component} />}
        </For>
      </Routes>
    </div>
  );
}
