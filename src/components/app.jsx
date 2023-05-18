import { Routes, Route } from "@solidjs/router";
import { css } from "solid-styled-components";

import routes from "../routes";
import "../index.css";

const appContainer = css`
  ${"" /* background-color: #ffffff; */}
  padding: 20px;
`;

const App = () => (
  <div class={appContainer}>
    <Routes>
      <For each={routes}>
        {({ href, component }) => <Route path={href} element={component} />}
      </For>
    </Routes>
  </div>
);

export default App;
