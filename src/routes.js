import { lazy } from "solid-js";

const routes = [
  {
    href: "/",
    title: "Home",
    component: lazy(() => import("./pages/homePage")),
  },
  {
    href: "/titles",
    title: "Titles",
    component: lazy(() => import("./pages/titles")),
  },
  {
    href: "/icons",
    title: "Funny",
    component: lazy(() => import("./pages/funnyexamples")),
  },
  {
    href: "/buttons",
    title: "Buttons",
    component: lazy(() => import("./pages/buttons")),
  },
  {
    href: "/alerts",
    title: "Alerts",
    component: lazy(() => import("./pages/alerts")),
  },
  {
    href: "/alertstack",
    title: "AlertStack",
    component: lazy(() => import("./pages/alertStackPage")),
  },
  {
    href: "/checkbox",
    title: "Checkboxes",
    component: lazy(() => import("./pages/checkboxes")),
  },
  {
    href: "/drawer",
    title: "Drawer",
    component: lazy(() => import("./pages/drawerPage")),
  },
];

export default routes;
