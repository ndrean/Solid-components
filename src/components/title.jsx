import { css, styled } from "solid-styled-components";

const title = (myclass) => (props) =>
  (
    <h1
      class={css`
        ${myclass}
      `}
    >
      {props.children}
    </h1>
  );

const propsTitle = (context) => (props) => {
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

const dynTitle = (myclass, tag = "h4") =>
  styled(tag)`
    ${myclass}
  `;

export { propsTitle, dynTitle, title };

/*
Examples:

 <CTitle newClass={context.classes.stdTitle} label="hi ho"/>

 const Title = title(context.classes.stdTitle)
 <Title>Hi ho</Title>

 */
