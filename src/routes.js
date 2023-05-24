import { lazy } from "solid-js";

const routes = [
  {
    href: "/",
    title: "Home",
    component: lazy(() => import("./pages/homePage")),
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
    href: "/buttons",
    title: "Buttons",
    component: lazy(() => import("./pages/buttons")),
  },
  {
    href: "/checkbox",
    title: "Checkboxes",
    component: lazy(() => import("./pages/checkboxes")),
  },
  {
    href: "/dialog",
    title: "Dialog",
    component: lazy(() => import("./pages/dialogPage")),
  },
  {
    href: "/drawer",
    title: "Drawer",
    component: lazy(() => import("./pages/drawerPage")),
  },
  {
    href: "/form",
    title: "Form",
    component: lazy(() => import("./pages/formPage")),
  },
  {
    href: "/icons",
    title: "Funny",
    component: lazy(() => import("./pages/funnyexamples")),
  },
  {
    href: "/modal",
    title: "Modal",
    component: lazy(() => import("./pages/modalPage")),
  },
  {
    href: "/select",
    title: "Select",
    component: lazy(() => import("./pages/selectPage")),
  },
  {
    href: "/spinner",
    title: "Spinners",
    component: lazy(() => import("./pages/spinnerPage")),
  },
  {
    href: "/titles",
    title: "Titles",
    component: lazy(() => import("./pages/titlesPage")),
  },
];

export default routes;
