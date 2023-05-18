import { A } from "@solidjs/router";
import { css } from "solid-styled-components";
import "../index.css";
import routes from "../routes";

// flex-direction: row;
const link = css`
  padding: 10px;
  margin: 5px 10px;
  display: inline-block;
  font-weight: bold;
  text-decoration: none;
`;

const navCss = css`
  width: var(--width);
  height: 100vh;
  background-color: #f1f1f1;
  overflow-y: scroll;
`;

const Nav = () => {
  return (
    <nav class={navCss}>
      <For each={routes}>
        {({ href, title }) => (
          <A href={href} class={link} end activeClass="bg-grey">
            {title}
          </A>
        )}
      </For>
    </nav>
  );
};

export default Nav;
