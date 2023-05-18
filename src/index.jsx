import { render } from "solid-js/web";
import { css } from "solid-styled-components";
import { Router } from "@solidjs/router";
import Nav from "./components/nav";
import App from "./components/app.jsx";
import { Burger } from "./pages/funnyexamples";

const container = css`
  display: grid;
  grid-template-columns: var(--width) 1fr;
  margin-top: 60px;
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

const Header = () => (
  <div class={headerCss}>
    <Burger />
    <p class={headerTitle}>MDLean SolidJS</p>
  </div>
);

render(
  () => (
    <>
      <Router>
        <Header />
        <Container>
          <Nav />
          <App />
        </Container>
      </Router>
    </>
  ),
  document.getElementById("root")
);
