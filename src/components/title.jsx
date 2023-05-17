import { styled, css } from "solid-styled-components";

const base = `
font-size: 2em;
font-weight: bold;
text-align: center;
padding: 4px;
background-color: beige;
`;

const title = (context) => (props) => <h1 {...props}>{props.children}</h1>;

const tClass =
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

const tClassProps = (context) => (props) =>
  <h1 class={css`[${base + props?.newClass}`}>{props.children}</h1>;

const tStyled = (context) =>
  styled("h1")((props) => `${props?.newClass ? base + props.newClass : base}`);

export { title, tClass, tClassProps, tStyled };
