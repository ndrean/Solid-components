import { css } from "solid-styled-components";
import { createEffect, createResource } from "solid-js";
import { A } from "@solidjs/router";
import { Suspense } from "solid-js";

import usersArticle from "./usersArticle";

import context from "../../context";
import { fetchUser } from "./data";
import loading from "./loading";

function postUsers(context) {
  const [usersData] = createResource(fetchUser);
  const UsersArticle = usersArticle(context);

  const astyle = css`
    text-decoration: none;
    background-color: beige;
    padding: 3px;
    border-radius: 5px;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  `;

  return (props) => {
    createEffect(() => (context.data = usersData()));
    return (
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
        <UsersArticle usersData={usersData()} />
      </div>
    );
  };
}

export default function FetchPage() {
  const PostUsers = postUsers(context);
  const Loading = loading();
  return (
    <Suspense fallback={<Loading />}>
      <PostUsers />
    </Suspense>
  );
}
