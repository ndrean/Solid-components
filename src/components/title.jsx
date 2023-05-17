import "../index.css";
import { styled } from "solid-styled-components";

const title = (context) => (props) =>
  <h1 class={context.myclass}>{props.children}</h1>;

const title2 = (context) => (props) => <h1 {...props}>{props.children}</h1>;
const t1 = (newclass) => (props) =>
  <h1 class={["title", newclass].join(" ")}> {props.children}</h1>;

const t2 = () => (props) =>
  <h1 class={["title", props.newclass].join(" ")}>{props.children}</h1>;

const h1BaseCss = "border: solid 5px; background-color: beige;";

const BaseH1Obj = (css) =>
  styled("h1")`
    ${css?.css ? h1BaseCss + css.css : h1BaseCss}
  `;

const BaseH1Props = () =>
  styled("h1")((props) => `${props?.css ? h1BaseCss + props.css : h1BaseCss}`);

export { t1, t2, BaseH1Obj, BaseH1Props, title, title2 };
