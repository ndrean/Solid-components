import { css, styled } from "solid-styled-components";
import { parseProps } from "../utils";

const defaultCss = { color: "blue" };

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

const Title3 = (css) => styled("h1")(() => css);
const Tgreen = Title3({ color: "green" });
export { Title1, Title2, Tgreen };
