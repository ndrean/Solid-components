import { A } from "@solidjs/router";
import { css } from "solid-styled-components";
import "../index.css";
import routes from "../routes";
import { menuOpen, setMenuOpen } from "./header";

// flex-direction: row;
const link = css`
  padding: 10px;
  margin: 5px 10px;
  display: inline-block;
  font-weight: bold;
  color: midnightblue;
  text-decoration: none;
`;
// color: #49535f;

const bgBisque = css`
  background-color: bisque;
`;

const navCss = css`
  width: var(--width);
  height: 100vh;
  background-color: #f1f1f1;
  color: #49535f;
  overflow-y: scroll;
  @media (max-width: var(--mobile)) ) {
    display: none;
  }
`;

const display = css`
  display: block;
`;

export default (props) => {
  return (
    <nav class={props?.override ? navCss + display : navCss}>
      <For each={routes}>
        {({ href, title }) => {
          return (
            <A
              href={href}
              class={link}
              end
              activeClass={bgBisque}
              onClick={() => (props?.navChange ? props.navChange() : null)}
            >
              {title}
            </A>
          );
        }}
      </For>
    </nav>
  );
};
