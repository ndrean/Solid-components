import { lazy } from "solid-js";

const routes = [
  { href: "/", title: "Home", component: lazy(() => import("./pages/home")) },
  {
    href: "/titles",
    title: "Titles",
    component: lazy(() => import("./pages/titles")),
  },
  {
    href: "/alerts",
    title: "Alerts",
    component: lazy(() => import("./pages/alerts")),
  },
  {
    href: "/buttons",
    title: "Buttons",
    component: lazy(() => import("./pages/buttons")),
  },
  {
    href: "/alertstacks",
    title: "AlertStacks",
    component: lazy(() => import("./pages/alertStacks")),
  },
];

export default routes;
