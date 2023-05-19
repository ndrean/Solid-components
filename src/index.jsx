import { createSignal, onMount, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import { css } from "solid-styled-components";
import { Router } from "@solidjs/router";

import button from "./components/button";
import Nav from "./components/nav";
import Pages from "./components/pages.jsx";
// import { Burger } from "./pages/funnyexamples";
import context from "./pages/context";
import drawer from "./components/drawer";
import { Header, menuOpen, setMenuOpen } from "./components/header";

const container = css`
  display: grid;
  grid-template-columns: var(--width) 1fr;
  margin-top: 60px;
  overflow-y: scroll;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Container = (props) => <div class={container}>{props.children}</div>;
const Button = button(context);
const Drawer = drawer(context);

const navChange = () => {
  // window.alert("going to..." + newItem.text);
  setTimeout(() => setMenuOpen(false), 400);
};

const App = () => {
  const [isMobile, setIsMobile] = createSignal(false);
  const checkMobile = () => setIsMobile(window.innerWidth <= 768);

  onMount(() => {
    checkMobile();
    // window.alert(window.innerWidth + " " + window.orientation);
    window.addEventListener("resize", checkMobile);
  });

  onCleanup(() => {
    window.removeEventListener("resize", checkMobile);
  });

  return (
    <>
      <Router>
        <Header />
        <Drawer open={menuOpen()} onClose={() => setMenuOpen(false)}>
          {isMobile() ? (
            <Nav override={isMobile()} navChange={() => navChange()} />
          ) : undefined}
        </Drawer>
        <Container>
          <Nav navChange={() => navChange()} />
          <Pages />
        </Container>
      </Router>
    </>
  );
};

render(() => <App />, document.getElementById("root"));
