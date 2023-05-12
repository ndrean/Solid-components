import { NavLink } from "@solidjs/router";
import routes from "./routes";

const Nav = () => {
  return (
    <nav class="mt-5 mb-3">
      <For each={routes}>
        {({ href, title }) => (
          <NavLink
            href={href}
            class="btn btn-primary me-2"
            activeClass="btn-success"
          >
            {title}
          </NavLink>
        )}
      </For>
    </nav>
  );
};

export default Nav;
