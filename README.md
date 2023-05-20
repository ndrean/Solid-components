# Pattern for customized functional components with SolidJS

This work is 100% based on [the following repo](https://github.com/FredericHeem/mdlean).

## Status

Still building...<https://test-solid.surge.sh>

## The pattern

You define a closure that takes an argument - the context - and renders a function component.

```jsx
const comp = (context) => (props) => component(context, props);

const ContextedComp = comp(someContext);

<ContextedComp {...props}>{props.children} </ContextedComp>;
```

This allows to pass a "static" theme without using `ThemeProvider` via `createContext`, as described [in the doc "context" example](https://www.solidjs.com/examples/context).

## "Traditional" CSS file

We define a component:

```js
const TitleV0 = (props) => <h1 {...props}>{props.children}</h1>;
```

We can use the `style` prop to define in-line CSS and pass a JS object:

```jsx
<TitleV0 style={{ color: "red" }}>Color is "red"</TitleV0>
```

SolidJS provides the prop `class`to pass a CSS class name. Suppose we define CSS classe "center-blue" in the file "index.css".

```css
.center-blue {
  text-align: center;
  color: blue;
}
```

We import de CSS and can use the CSS classes:

```jsx
<TitleV0 class="center-blue">Blue and centered</TitleV0>
```

## Using the pattern with CSS-in-JS

We can use CSS-in-JS with the library [solid-styled-components](https://github.com/solidjs/solid-styled-components).

Lets copy-paste CSS into JS and create a "context" object:

```js
// context.js

const base = `
  color: red;
  border: dotted 1px;
`;
const blueSolid = `
  color: blue;
  border: solid 1px;
`;

export default { classes: { base, blueSolid } };
```

We can now define customized components that use the `context` object. We use `css` from the package "solid-styled-components".

```js
import { css } from "solid-styled-components";

const title = (context) => (props) => {
  const {
    classes: { base },
  } = context;
  const newclass = props?.newClass ? props.newClass : base;
  return (
    <h4
      class={css`
        ${newclass}
      `}
    >
      {props.children}
    </h4>
  );
};
```

and use it:

```jsx
import context from "./context.js";
const {classes: {blueSolid}} = context;

[...]
const ContextedTitle = title(context);

<ContextedTitle>Default title is red-dotted</ContextedTitle>
<ContextedTitle newClass={blueSolid}>Blue solid title</ContextedTitle>
```

## Override classes

We have a base component with class `base` and we want to override the CSS. When we want to override classes, we simply add "oldClass + newClass" (in this order).

```jsx
const title = (context) => (props) => {
  const {
    classes: { base },
  } = context;
  const newclass = props?.newClass ? base + props.newClass : base;
  return (
    <h1
      class={css`
        ${newclass}
      `}
    >
      {props.children}
    </h1>
  );
};
```

```jsx
const {
  classes: { blueSolid },
} = context;
const Title = title(context);
<Title>A red dotted title</Title>;

<Title newClass={blueSolid}> A solid blue title </Title>;
```

We can also use `styled`from "solid-styled-components". This returned a styled function component.

```jsx
import { styled } from "solid-styled-components";

const styledTitle = (context) =>
    styled("h4")((props) => {
      const {
        classes: { base },
      } = context;
      return props?.newClass ? base + props.newClass : base;
    });

const StyledTitle = styledTitle(context);
<StyledTitle> A red dotted title</StyledTitle>
<StyledTitle newClass={blueSolid}>Blue solid title</StyledTitle>
```
