import { Routes, Route } from "@solidjs/router";
// import { styled } from "solid-styled-components";

import routes from "../routes";
import "../index.css";

export default (context) => (
  <div>
    <Routes>
      <For each={routes}>
        {({ href, component }) => <Route path={href} element={component} />}
      </For>
    </Routes>
  </div>
);
