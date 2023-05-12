import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";

import styles from "./App.module.css";
import Nav from "./components/nav";

const Home = lazy(() => import("./pages/home"));
const Test = lazy(() => import("./pages/test"));

export default function App() {
  return (
    <div class={styles.App}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}
