import { css, styled } from "solid-styled-components";

const title = (context) => (props) => {
  const {
    classes: { base },
  } = context;
  const label = props.label || props.children;
  return (
    <h4
      class={css`
        ${props.newClass ? base + props.newClass : base}
      `}
      {...props}
    >
      {label}
    </h4>
  );
};

const dTitle = (tag = "h4", myclass = "", opt = "") =>
  styled(tag)`
    ${myclass};
    ${opt}
  `;

const sTitle = (context) => (tag, base) =>
  styled(tag)((props) => {
    return props.newClass ? base + props.newClass : base;
  });

export { dTitle, title, sTitle };
