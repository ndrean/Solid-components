import "../index.css";
import { styled } from "solid-styled-components";

const TitleV1 = (props) => (
  <h1 class={["title", props.newClass].join(" ")}> {props.children}</h1>
);

const h1BaseCss = "border: solid 5px; background-color: beige;";

const BaseH1Obj = (css) =>
  styled("h1")`
    ${css?.css ? h1BaseCss + css.css : h1BaseCss}
  `;

const BaseH1Props = () =>
  styled("h1")((props) => `${props?.css ? h1BaseCss + props.css : h1BaseCss}`);

export { TitleV1, BaseH1Obj, BaseH1Props };
