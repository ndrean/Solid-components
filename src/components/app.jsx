import { Route } from "@solidjs/router";

import routes from "../routes";
import "../index.css";

const App = () => (
  <>
    <For each={routes}>
      {({ href, component }) => <Route path={href} element={component} />}
    </For>
  </>
);

export default App;
