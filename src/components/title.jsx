import { styled, css } from "solid-styled-components";

const base = `
font-size: 2em;
font-weight: bold;
text-align: center;
padding: 4px;
background-color: beige;
`;

const title = (context) => (props) => <h1 {...props}>{props.children}</h1>;

const propStyled = (context) =>
  styled("h1")((props) => (props.newClass ? base + props.newClass : base));

const contextStyled = (context) =>
  styled("h1")((props) => (context?.newClass ? base + context.newClass : base));

const classTitle =
  (newclass = null) =>
  (props) =>
    (
      <h1
        class={css`
          ${base + newclass}
        `}
      >
        {props.children}
      </h1>
    );

const propClassTitle =
  (context = undefined) =>
  (props) =>
    <h1 class={css`[${base + props?.newClass}`}>{props.children}</h1>;

export { title, classTitle, propStyled, contextStyled, propClassTitle };
