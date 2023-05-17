import { render } from "solid-js/web";
import { Router, Routes } from "@solidjs/router";
import { ThemeProvider } from "solid-styled-components";
import Nav from "./components/nav";
import App from "./components/app.jsx";

const theme = {
  colors: {
    primary: "hotpink",
  },
};

render(
  () => (
    <Router>
      <ThemeProvider theme={theme}>
        <Nav />
        <Routes>
          <App />
        </Routes>
      </ThemeProvider>
    </Router>
  ),
  document.getElementById("root")
);
