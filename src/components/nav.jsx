import { NavLink } from "@solidjs/router";

const Nav = () => {
  return (
    <nav class="mt-5 mb-3">
      <NavLink href="/" class="btn btn-primary me-2" activeClass="btn-success">
        Home
      </NavLink>
      <NavLink href="/test" class="btn btn-primary" activeClass="btn-success">
        Titles
      </NavLink>
    </nav>
  );
};

export default Nav;
