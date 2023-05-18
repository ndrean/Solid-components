import { render } from "solid-js/web";
import { css } from "solid-styled-components";
import { Router } from "@solidjs/router";
import Nav from "./components/nav";
import App from "./components/app.jsx";

const container = css`
  display: grid;
  grid-template-columns: 200px 1fr;
  margin-top: 60px;
`;

const headerCss = css`
  background-color: #333333;
  color: #ffffff;
  text-align: center;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;
const Container = (props) => <div class={container}>{props.children}</div>;

const Header = () => <div class={headerCss}>MDLean SolidJS</div>;
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
