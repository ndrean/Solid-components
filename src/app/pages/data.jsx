import { createResource } from "solid-js";

const fetchUser = (ctx) =>
  async function (p) {
    const page = p === ":p" ? 2 : p;
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    const { data } = await response.json();
    ctx.setData(data);

    return data;
  };

const usersData =
  (ctx) =>
  ({ params, location, navigate, data }) => {
    const [userData] = createResource(() => params.p, fetchUser(ctx));
    ctx.setData(userData());
    return userData;
  };

export { fetchUser, usersData };
