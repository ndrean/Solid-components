# Pattern for customized functional components with SolidJS

100% based on: <https://github.com/FredericHeem/mdlean>

## Status

Building...<https://test-solid.surge.sh>

## Pattern

We define a closure that takes an argument context and renders a function component.

```jsx
const comp = (context) => (props) => component(context, props);

const ContextedComp = comp(someContext);

<ContextedComp {...props}>{props.children} </ContextedComp>;
```

Here is an example:

```js
const title = (context) => (props) => <h1 {...props}> {props.children}</h1>;
```

Suppose we defined CSS classes "red-dotted" and "blue-solid".

```css
.redclass {
  color: red;
  border: dotted 1px;
}

.blue-solid {
  color: blue;
  border: solid 1px;
}
```

We define a general object "context":

```js
const context = {
  redclass: "red-dotted",
  blueclass: "blue-solid",
};
```

We can now define customized components using the `context` object:

```jsx
const Title = title(context);
```

and we can use the context to define a `class` prop:

```jsx
<Title class={css`${context.redclass}`}>My red title</Title>

<Title class={css`${context.blueclass}`}>My blue title</Title>
```

## Overriding CSS in JS

Suppose we have a base component with class `base` and we want to override the CSS.

We can use classes from "index.css". We can also do CSS in JS with the package "solid-styled-components".

```js
const base = `
  color: black;
`;

const blue = `
  color: blue
`;
```

```jsx
import { css } from "solid-styled-components";

const overTitle = (newclass) => (props) =>
  (
    <h1
      class={css`
        ${base + newclass}
      `}
    >
      {props.children}
    </h1>
  );

const BaseTitle = overTitle();
const OverTitle = overTitle(blue);
```

We can also use `styled`from "solid-styled-components". This returned a styled function component.

```jsx

import { styled } from "solid-styled-components";

const StyledTitle = () =>
  styled("h1")((props) => props?.newClass ? base + props.newClass : base});

const contextedTitle = (context) =>
  styled("h1")((props) => (context?.newClass ? context.newClass + base : base));

const ContextedTitle = contextedTitle({newClass: blue})

<StyledTitle>Basic title</StyledTitle>
<StyledTitle newClass={blue}>Blue title</StyledTitle>
<ContexedTitle> Anotherblue title</ContexedTitle>
```
