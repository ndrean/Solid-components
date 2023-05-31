import { lazy } from "solid-js";
import { UsersData } from "./app/pages/data";

const routes = [
  {
    path: "/",
    title: "Home",
    component: lazy(() => import("./app/pages/homePage")),
  },
  {
    path: "/api",
    title: "Api",
    data: () => "ok",
    component: lazy(() => import("./app/pages/apiPage")),
  },
  {
    path: "/alerts",
    title: "Alert",
    component: lazy(() => import("./alert/alertPage")),
  },
  {
    path: "/alertstack",
    title: "AlertStack",
    component: lazy(() => import("./alertStack/alertStackPage")),
  },
  {
    path: "/postfetch/:p",
    title: "Fetch Data",
    component: lazy(() => import("./app/pages/FetchPage")),
  },
  // {
  //   path: "/prefetch/:p",
  //   title: "PreFetch",
  //   data: UsersData,
  //   component: lazy(() => import("./app/pages/preFetchPage")),
  // },

  {
    path: "/buttons",
    title: "Button",
    component: lazy(() => import("./button/buttonsPage")),
  },
  {
    path: "/checkbox",
    title: "Checkbox",
    component: lazy(() => import("./checkbox/checkboxesPage")),
  },
  {
    path: "/dialog",
    title: "Dialog",
    component: lazy(() => import("./dialog/dialogPage")),
  },
  {
    path: "/drawer",
    title: "Drawer",
    component: lazy(() => import("./drawer/drawerPage")),
  },
  {
    path: "/dynamic",
    title: "Dynamic",
    component: lazy(() => import("./app/pages/dynamicPage")),
  },
  {
    path: "/form",
    title: "Form",
    component: lazy(() => import("./form/formPage")),
  },
  {
    path: "/inputs",
    title: "Input",
    component: lazy(() => import("./input/inputsPage")),
  },
  {
    path: "/modal",
    title: "Modal",
    component: lazy(() => import("./modal/modalPage")),
  },

  {
    path: "/select",
    title: "Select",
    component: lazy(() => import("./select/selectPage")),
  },
  {
    path: "/spinner",
    title: "Spinner",
    component: lazy(() => import("./spinner/spinnerPage")),
  },
  {
    path: "/titles",
    title: "Title",
    component: lazy(() => import("./app/pages/titlesPage")),
  },
];

export default routes;
