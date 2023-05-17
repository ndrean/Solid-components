import { A } from "@solidjs/router";
import { css } from "solid-styled-components";
import "../index.css";
import routes from "../routes";

const flexItem = css``;
const Nav = () => {
  return (
    <nav
      class={css`
        display: flex;
        height: 100%;
      `}
    >
      <For each={routes}>
        {({ href, title }) => (
          <A
            href={href}
            class="link"
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
