import { css, styled } from "solid-styled-components";

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

const extendedTitle = (context) => (props) => {
  const {
    classes: { base },
  } = context;
  return (
    <h4
      class={css`
        ${props?.newClass ? props.newClass : base}
      `}
    >
      {props.children}
    </h4>
  );
};

const styledTitle = (context) =>
  styled("h4")((props) => {
    const {
      classes: { base },
    } = context;
    return props?.newClass ? base + props.newClass : base;
  });

export { styledTitle, extendedTitle };
