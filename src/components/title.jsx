import { css } from "solid-styled-components";

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

const contextedTitle = (context) => (props) => {
  const {
    classes: { base },
  } = context;
  const label = props?.label || props.children;
  return (
    <h4
      class={css`
        ${props?.newClass ? base + props.newClass : base}
      `}
      {...props}
    >
      {label}
    </h4>
  );
};

export { contextedTitle };
