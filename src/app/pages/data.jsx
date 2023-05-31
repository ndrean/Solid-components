import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";

export async function fetchUser(p = 1) {
  const page = p === true ? 1 : p;
  const response = await fetch(`https://reqres.in/api/users?page=${page}`);
  const { data } = await response.json();
  return data;
}

export function UsersData({ params, location, navigate, data }) {
  const [userData] = createResource(() => params.p, fetchUser);
  return userData;
}
