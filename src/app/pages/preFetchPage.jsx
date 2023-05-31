// pages/users/[id].js
import { useRouteData, A } from "@solidjs/router";
import { styled, css } from "solid-styled-components";

import Link from "../Link";

const Div = styled("div")`
  display: flex;
  flex-wrap: wrap;

  > img {
    margin: 10px;
  }
  > article {
    padding: 10px;
    text-align: center;
    flex: 2 1 auto;
    width: min-content;
  }
`;

const astyle = css`
  text-decoration: none;
  background-color: beige;
  padding: 3px;
  border-radius: 5px;
  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

export default function Users() {
  const users = useRouteData();
  return (
    <div>
      <h4>
        This is an illustration of{" "}
        <Link
          href="https://github.com/solidjs/solid-router#data-functions"
          target="#"
        >
          Data Functions
        </Link>{" "}
        from Solid Router. The data is "pre-fetched" and passed to the component
        via the <code> data </code> props and <code> useRouteData </code>. The
        other procedure is{" "}
        <A class={astyle} href="/postfetch/1">
          Load page & Fetch
        </A>
        .
      </h4>

      <Div>
        <For each={users()}>
          {(user) => (
            <article>
              <p>{user.email}</p>
              <img src={user.avatar} alt="user" />
            </article>
          )}
        </For>
      </Div>
    </div>
  );
}
