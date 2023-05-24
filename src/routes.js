import { lazy } from "solid-js";

const routes = [
  {
    href: "/",
    title: "Home",
    component: lazy(() => import("./pages/homePage")),
  },
  {
    href: "/select",
    title: "Select",
    component: lazy(() => import("./pages/selectPage")),
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
    href: "/form",
    title: "Form",
    component: lazy(() => import("./pages/formPage")),
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
  {
    href: "/dialog",
    title: "Dialog",
    component: lazy(() => import("./pages/dialogPage")),
  },
  {
    href: "/modal",
    title: "Modal",
    component: lazy(() => import("./pages/modalPage")),
  },
  {
    href: "/spinner",
    title: "Spinners",
    component: lazy(() => import("./pages/spinnerPage")),
  },
];

export default routes;
