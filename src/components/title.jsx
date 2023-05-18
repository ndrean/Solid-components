import { styled, css } from "solid-styled-components";

const base = `
font-size: 2em;
font-weight: bold;
text-align: center;
padding: 4px;
background-color: beige;
`;

const title = (context) => (props) => <h1 {...props}>{props.children}</h1>;

const myTitle = (myclass) => (props) =>
  <h1 class={myclass}>{props.children}</h1>;

const toClass = (mycss) =>
  css`
    ${mycss}
  `;

const myTitle2 = (css) => (props) =>
  <h1 class={toClass(css)}>{props.children}</h1>;

const propStyled = (context) =>
  styled("h1")((props) => {
    console.log("propStyled", props.theme);
    return props.newClass ? base + props.newClass : base;
  });

const contextStyled = (context) =>
  styled("h1")((props) => (context?.newClass ? base + context.newClass : base));

const classTitle =
  (newclass = null) =>
  (props) =>
    <h1 class={toClass(base + newclass)}>{props.children}</h1>;

const propClassTitle =
  (context = undefined) =>
  (props) =>
    <h1 class={toClass(base + props?.newClass)}>{props.children}</h1>;

export {
  myTitle,
  myTitle2,
  title,
  classTitle,
  propStyled,
  contextStyled,
  propClassTitle,
};
