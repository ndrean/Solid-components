import { A } from "@solidjs/router";
import { css } from "solid-styled-components";
import "../index.css";
import routes from "../routes";

// flex-direction: row;
const link = css`
  padding: 15px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border: solid 1px;
  display: inline-block;
  font-weight: bold;
  text-decoration: none;
`;

/* 
 display: flex;
height: 100%;
 */
const navCss = css`
  width: 150px;
  height: 100vh;
  background-color: #f1f1f1;
  overflow-y: scroll;
`;

const flexItem = css``;
const Nav = () => {
  return (
    <nav class={navCss}>
      <For each={routes}>
        {({ href, title }) => (
          <A
            href={href}
            class={link}
            end
            activeClass="bg-grey"
            inactiveClass="bg-white"
          >
            {title}
          </A>
        )}
      </For>
    </nav>
  );
};

export default Nav;
