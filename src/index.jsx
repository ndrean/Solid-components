import {
  createSignal,
  onMount,
  onCleanup,
  Show,
  Suspense,
  createEffect,
} from "solid-js";
import { render } from "solid-js/web";
import { styled, css } from "solid-styled-components";
import { Router } from "@solidjs/router";

import context from "./context";

import nav from "./app/nav";
import pages from "./app/pages/pages";
import drawer from "./drawer/drawer";
import header from "./app/header";
import loading from "./app/pages/loading";

const GridContainer = styled("div")`
  display: grid;
  grid-template-columns: var(--width) auto;
  margin-top: 60px;
  max-height: 100vh;
  overflow: hidden auto;
  overflow-behavior: contain;
`;
// grid: [stack] 1fr / min-content var(--width) [stack] auto;
// overflow-y: scroll;

const Container = styled("div")`
  display: block;
  margin-top: 60px;
  overflow: auto;
  max-height: 100vh;
`;

const app = (context) => {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [isMobile, setIsMobile] = createSignal(false);
  const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
  const navChange = () => {
    setTimeout(() => setMenuOpen(false), 100);
  };
  const toggleMenu = () => setMenuOpen((v) => !v);

  const Nav = nav(context);
  const Drawer = drawer(context);
  const Loading = loading(context);
  const Header = header(context);
  const Pages = pages(context);

  onMount(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
  });

  onCleanup(() => {
    window.removeEventListener("resize", checkIsMobile);
  });

  return (
    <Router>
      <Header toggle={toggleMenu} />
      <Suspense fallback={<Loading />}>
        <Show
          when={isMobile()}
          fallback={
            <GridContainer>
              <Nav navChange={navChange} />
              <Pages />
            </GridContainer>
          }
        >
          <Container id="mobile">
            <Drawer open={menuOpen()} onClose={() => setMenuOpen(false)}>
              <Nav navChange={navChange} />
            </Drawer>
            <Pages />
          </Container>
        </Show>
      </Suspense>
    </Router>
  );
};

const App = () => app(context);
render(() => <App />, document.getElementById("root"));
