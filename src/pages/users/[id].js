import { useRouteData } from "@solidjs/router";

export default function User() {
  const user = useRouteData();
  return <h1>{user().name}</h1>;
}
