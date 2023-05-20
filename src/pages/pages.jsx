import { Routes, Route } from "@solidjs/router";
import { css } from "solid-styled-components";

import routes from "../routes";
import "../index.css";

const appContainer = css`
  padding: 20px;
  overflow-y: scroll;
  @media (max-width: var(--mobile)) ) {
    width: 100%;
  }
`;

export default () => (
  <div class={appContainer}>
    <Routes>
      <For each={routes}>
        {({ href, component }) => <Route path={href} element={component} />}
      </For>
    </Routes>
  </div>
);
