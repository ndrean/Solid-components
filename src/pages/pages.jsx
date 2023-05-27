import { Routes, Route } from "@solidjs/router";
import { styled } from "solid-styled-components";

import routes from "../routes";
import "../index.css";

const Main = styled("main")`
  padding: 0px 5px 0px 5px;
`;

export default (context) => () =>
  (
    <Main>
      <Routes>
        <For each={routes}>
          {({ href, component }) => <Route path={href} element={component} />}
        </For>
      </Routes>
    </Main>
  );
