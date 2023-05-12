import { lazy } from "solid-js";

const Home = lazy(() => import("../pages/home"));
const Titles = lazy(() => import("../pages/titles"));

const routes = [
  { href: "/", title: "Home", component: Home },
  { href: "/titles", title: "Titles", component: Titles },
];

export default routes;
