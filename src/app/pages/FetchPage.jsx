import { styled, css } from "solid-styled-components";
import { createResource } from "solid-js";
import { A } from "@solidjs/router";

import context from "../../context";
import { fetchUser } from "./data";

const Div = styled("div")`
  display: flex;
  flex-wrap: wrap;

  > img {
    margin: 10px;
  }
  > article {
    width: min-content;
    padding: 10px;
    text-align: center;
  }
`;

const astyle = css`
  text-decoration: none;
  background-color: beige;
  padding: 3px;
  transition: transform 0.3s;
  border-radius: 5px;
  &:hover {
    transform: scale(1.1);
  }
`;

function users(context) {
  const [userData] = createResource(fetchUser);

  return (props) => (
    <div>
      <p>
        The userData in this page is fetched <strong>after</strong> page
        rendering.{" "}
      </p>
      <h5>
        You can also{" "}
        <strong>
          <A class={astyle} href="/prefetch/2">
            PRE FETCH
          </A>
          "
        </strong>{" "}
        the data while loading the page.
      </h5>
      <Div>
        <For each={userData()}>
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

const Users = users(context);

export default function FetchPage() {
  const FetchUser = users(context);
  return <FetchUser />;
}
