import { Routes, Route } from "@solidjs/router";
// import { styled } from "solid-styled-components";

import routes from "../routes";
import "../index.css";

// const AppContainer = styled("div")`
//   padding: 20px;
//   overflow-y: scroll;
//   @media (max-width: var(--mobile)) ) {
//     width: 100%;
//   }
// `;

export default (context) => (
  <div>
    <Routes>
      <For each={routes}>
        {({ href, component }) => <Route path={href} element={component} />}
      </For>
    </Routes>
  </div>
);
