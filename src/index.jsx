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

import nav from "./components/nav";
import pages from "./pages/pages.jsx";
import drawer from "./components/drawer";
import header from "./components/header";
import { spinCircle } from "./components/loaders";

const GridContainer = styled("div")`
  display: grid;
  grid-template-columns: var(--width) auto;
  margin-top: 60px;
  overflow: hidden auto;
  overflow-behavior: contain;
  max-height: 100vh;
`;
// grid: [stack] 1fr / min-content var(--width) [stack] auto;
// overflow-y: scroll;

const Container = styled("div")`
  display: block;
  margin-top: 60px;
  overflow: auto;
  overflow-behavior: contain;
  max-height: 100vh;
`;

// @media (max-width: var(--mobile)) {
//   grid-template-columns: 100vw;
// }
// const NavContainer = styled("div")`
//   display: ${(props) => props.hideOnMobile && "none"};
//   @media (max-width: var(--mobile)) {
//     display: block;
//   }
// `;

const CenterSpin = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const App = () => {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [isMobile, setIsMobile] = createSignal(false);
  const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
  const navChange = () => setTimeout(() => setMenuOpen(false), 100);
  const toggleMenu = () => setMenuOpen((v) => !v);

  const Nav = nav(context);
  const Drawer = drawer(context);
  const Spin = spinCircle(context);
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
      <Suspense
        fallback={
          <CenterSpin>
            <Spin />
          </CenterSpin>
        }
      >
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

render(() => <App />, document.getElementById("root"));
