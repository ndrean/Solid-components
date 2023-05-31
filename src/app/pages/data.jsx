import { createResource } from "solid-js";

export async function fetchUser(p) {
  console.log({ p });
  const page = p === ":p" ? 2 : p;
  const response = await fetch(`https://reqres.in/api/users?page=${page}`);
  const { data } = await response.json();

  return data;
}

export function UsersData({ params, location, navigate, data }) {
  const [userData] = createResource(() => params.p, fetchUser);
  return userData;
}
