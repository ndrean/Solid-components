import { createSignal, onMount, onCleanup, Show, Suspense } from "solid-js";
import { render } from "solid-js/web";
import { css, styled } from "solid-styled-components";
import { Router } from "@solidjs/router";

import nav from "./components/nav";
import Pages from "./pages/pages.jsx";
import context from "./context";
import drawer from "./components/drawer";
import header from "./components/header";
import { spinCircle } from "./components/loaders";

const container = css`
  display: grid;
  grid-template-columns: var(--width) 1fr;
  margin-top: 60px;
  overflow-y: scroll;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CenterSpin = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const App = () => {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [isMobile, setIsMobile] = createSignal(false);
  const checkMobile = () => setIsMobile(window.innerWidth <= 768);
  const navChange = () => setTimeout(() => setMenuOpen(false), 100);
  const toggleMenu = () => setMenuOpen((v) => !v);

  const Nav = nav(context);
  const Drawer = drawer(context);
  const Spin = spinCircle(context);
  const Header = header(context);

  const Container = (props) => <div class={container}>{props.children}</div>;

  onMount(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
  });

  onCleanup(() => {
    window.removeEventListener("resize", checkMobile);
  });

  return (
    <>
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
              <Container>
                <Nav />

                <Pages />
              </Container>
            }
          >
            <Drawer open={menuOpen()} onClose={() => setMenuOpen(false)}>
              <Nav override={isMobile()} navChange={(e) => navChange(e)} />
            </Drawer>
            <Container>
              <Pages />
            </Container>
          </Show>
        </Suspense>
      </Router>
    </>
  );
};

render(() => <App />, document.getElementById("root"));
