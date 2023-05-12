import { genComponent } from "../utils";

const titleGreen = {
  color: "green",
  "font-size": "2rem",
  "font-weight": "bold",
  border: "solid 2px",
};

const Title1 = genComponent("h1", titleGreen);

export { Title1 };

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
