import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { css } from "solid-styled-components";
import { Router } from "@solidjs/router";

import button from "./components/button";
import Nav from "./components/nav";
import App from "./components/app.jsx";
import { Burger } from "./pages/funnyexamples";
import context from "./pages/context";
import drawer from "./components/drawer";

const container = css`
  display: grid;
  grid-template-columns: var(--width) 1fr;
  margin-top: 60px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-top: 0; /* Remove margin for small screens */
  }
`;

const headerCss = css`
  background-color: #333333;
  color: #ffffff;
  text-align: center;
  padding: 5px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: start;
`;

const headerTitle = css`
  margin-left: 15px;
`;

const Container = (props) => <div class={container}>{props.children}</div>;
const Button = button(context);
const Drawer = drawer(context);

const [drawerOpen, setDrawOpen] = createSignal(false);
const Header = () => {
  return (
    <div class={headerCss}>
      <Button onClick={() => setDrawOpen((val) => !val)}>
        <Burger />
      </Button>
      <p class={headerTitle}>Components & CSS with SolidJS</p>
    </div>
  );
};

const navChange = (newItem) => {
  window.alert("going to..." + newItem.text);
  setTimeout(() => setDrawOpen(false), 400);
};

render(
  () => (
    <>
      <Router>
        <Header />
        <Drawer open={drawerOpen()} onClose={() => setDrawOpen(false)}>
          <p>{drawerOpen() ? "true" : "false"}</p>
        </Drawer>
        <Container>
          <Nav />
          <App />
        </Container>
      </Router>
    </>
  ),
  document.getElementById("root")
);
