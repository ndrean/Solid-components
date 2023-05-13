import { lazy } from "solid-js";

const routes = [
  { href: "/", title: "Home", component: lazy(() => import("./pages/home")) },
  {
    href: "/titles",
    title: "Titles",
    component: lazy(() => import("./pages/titles")),
  },
];

export default routes;
