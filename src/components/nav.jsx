import { A } from "@solidjs/router";
import "../index.css";
import routes from "../routes";

const Nav = () => {
  return (
    <nav class="nav">
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
