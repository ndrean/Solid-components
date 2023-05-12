import { css } from "solid-styled-components";
import { parseProps } from "../utils";

const defaultCss = css({ color: "blue" });

const StyledTitle = (props) => {
  const cssObj = parseProps(props);
  const newclass = Object.keys(cssObj).length > 0 ? css(cssObj) : defaultCss;

  return <h1 class={newclass}>{props.children}</h1>;
};

export default StyledTitle;
