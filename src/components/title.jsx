import { css } from "solid-styled-components";

const base = `
font-size: 2em;
font-weight: bold;
text-align: center;
padding: 4px;
background-color: beige;
`;

export default (myclass) => (props) =>
  (
    <h1
      class={css`
        ${myclass}
      `}
    >
      {props.children}
    </h1>
  );
