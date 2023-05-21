import { createSignal, onMount, onCleanup, Show, Suspense } from "solid-js";
import { render } from "solid-js/web";
import { css, styled } from "solid-styled-components";
import { Router } from "@solidjs/router";

import Nav from "./components/nav";
import Pages from "./pages/pages.jsx";
import context from "./pages/context";
import drawer from "./components/drawer";
import { Header, menuOpen, setMenuOpen } from "./components/header";
import spinCircle from "./components/spinCircle";

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
  const [isMobile, setIsMobile] = createSignal(false);
  const checkMobile = () => setIsMobile(window.innerWidth <= 768);
  const navChange = () => setTimeout(() => setMenuOpen(false), 400);

  const Container = (props) => <div class={container}>{props.children}</div>;
  const Drawer = drawer(context);
  const Spin = spinCircle(context);

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
        <Header />
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
              <Nav override={isMobile()} navChange={() => navChange()} />
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
