// pages/users/[id].js
import { useRouteData, A } from "@solidjs/router";
import { Suspense } from "solid-js";
import { css } from "solid-styled-components";
import usersArticle from "./usersArticle";
import Link from "./Link";
import context from "../../context";
import loading from "./loading";

const users = (ctx) => {
  const usersData = useRouteData();
  const UsersArticle = usersArticle(ctx);

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

  return (props) => {
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
          from Solid Router. The data is "pre-fetched" and passed to the
          component via the <code> data </code> props and{" "}
          <code> useRouteData </code>.{" "}
        </h4>
        <h4>
          If this is a kind of <strong>static</strong> data you want to save,
          you can push it in the context as an illustration. Navigate back to
          the{" "}
          <A class={astyle} href="/">
            HomePage
          </A>{" "}
          to check.
        </h4>
        <h4>
          The other procedure is{" "}
          <A class={astyle} href="/postfetch/1">
            Load page & Fetch
          </A>
          .
        </h4>

        <UsersArticle usersData={usersData()} />
      </div>
    );
  };
};

export default function PreFetchPage() {
  const Users = users(context);
  const Loading = loading(context);
  return (
    <Suspense fallback={<Loading />}>
      <Users />
    </Suspense>
  );
}
