import { css } from "solid-styled-components";
import { createSignal } from "solid-js";

import { Burger } from "../pages/funnyexamples";
import button from "./button";
import context from "../pages/context";

const headerCss = css`
  background-color: #333333;
  color: #ffffff;
  padding: 5px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
`;

const headerTitle = css`
  margin-left: 15px;
`;

const Button = button(context);

const [menuOpen, setMenuOpen] = createSignal(false);

const Header = () => {
  return (
    <div class={headerCss}>
      <Button onClick={() => setMenuOpen((val) => !val)} aria-label="btn">
        <Burger />
      </Button>
      <p class={headerTitle}>Components & CSS with SolidJS</p>
    </div>
  );
};

export { Header, menuOpen, setMenuOpen };
