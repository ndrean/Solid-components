import { styled } from "solid-styled-components";
// import { parseProps } from "../utils";

const defaultCss = { color: "blue" };

const title = (tag, css) => styled(tag)(() => (css ? css : defaultCss));

const Tcustom = title("h1", {
  color: "green",
  "font-size": "2rem",
  "font-weight": "bold",
});
const Tdefault = title("h1");

export { Tcustom, Tdefault };

/*
const Title1 = (props) => {
  const cssObj = parseProps(props);
  const newclass =
    Object.keys(cssObj).length > 0 ? css(cssObj) : css(defaultCss);
  return <h1 class={newclass}>{props.children}</h1>;
};

// default props are "theme" and children"
const Title2 = styled("h1")((props) =>
  Object.keys(props).length > 2 ? parseProps(props) : defaultCss
);
*/
