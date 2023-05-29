import { lazy } from "solid-js";

const routes = [
  {
    href: "/",
    title: "Home",
    component: lazy(() => import("./app/pages/homePage")),
  },
  {
    href: "/api",
    title: "Api",
    component: lazy(() => import("./app/pages/apiPage")),
  },
  {
    href: "/alerts",
    title: "Alerts",
    component: lazy(() => import("./alert/alerts")),
  },
  {
    href: "/alertstack",
    title: "AlertStack",
    component: lazy(() => import("./alertStack/alertStackPage")),
  },
  {
    href: "/buttons",
    title: "Buttons",
    component: lazy(() => import("./button/buttons")),
  },
  {
    href: "/checkbox",
    title: "Checkbox",
    component: lazy(() => import("./checkbox/checkboxes")),
  },
  {
    href: "/dialog",
    title: "Dialog",
    component: lazy(() => import("./dialog/dialogPage")),
  },
  {
    href: "/drawer",
    title: "Drawer",
    component: lazy(() => import("./drawer/drawerPage")),
  },
  {
    href: "/dynamic",
    title: "Dynamic",
    component: lazy(() => import("./app/pages/dynamicPage")),
  },
  {
    href: "/form",
    title: "Form",
    component: lazy(() => import("./form/formPage")),
  },
  {
    href: "/inputs",
    title: "Inputs",
    component: lazy(() => import("./input/inputsPage")),
  },
  {
    href: "/modal",
    title: "Modal",
    component: lazy(() => import("./modal/modalPage")),
  },
  {
    href: "/select",
    title: "Select",
    component: lazy(() => import("./select/selectPage")),
  },
  {
    href: "/spinner",
    title: "Spinners",
    component: lazy(() => import("./spinner/spinnerPage")),
  },
  {
    href: "/titles",
    title: "Titles",
    component: lazy(() => import("./app/pages/titlesPage")),
  },
];

export default routes;
