# Pattern for customized functional components with SolidJS

This work is 100% based on the following repo: <https://github.com/FredericHeem/mdlean>

## Status

Still building...<https://test-solid.surge.sh>

## The pattern

We define a closure that takes an argument context and renders a function component.

```jsx
const comp = (context) => (props) => component(context, props);

const ContextedComp = comp(someContext);

<ContextedComp {...props}>{props.children} </ContextedComp>;
```

## Example

Suppose we want to apply the CSS classes "red-dotted" and "blue-solid" to a `h1` tag.

```css
/* index.css */
.red-dotted {
  color: red;
  border: dotted 1px;
}

.blue-solid {
  color: blue;
  border: solid 1px;
}
```

We define a closure that takes a class name (as a string) and returns a function component:

```jsx
const myTitle = (myclass) => (props) =>
  <h1 class={myclass}>{props.children}</h1>;
```

```js
import "index.css";
import { myTitle } from "...";

// [...]
const RedTitle = myTitle("red-dotted");
const BlueTitle = myTitle("blue-solid");
```

And use it:

```jsx
<RedTitle>A red title</RedTitle>
<BlueTitle>A blue title</BlueTitle>
```

## JS in CSS

We can alternatively use JS in CSS with the library [solid-styled-components](https://github.com/solidjs/solid-styled-components).

Lets copy-paste CSS into JS:

```js
// context.js

const redDotted = `
  color: red;
  border: dotted 1px;
`;
const blueSolid = `
  color: blue;
  border: solid 1px;
`;

export default { redDotted, blueSolid };
```

We can now define customized components that use the `context` object. We define a helper function `toClass` that uses `css` from "solid-styled-components".

```jsx
import context from "./context.js";

const toClass = (cssObj) =>
  css`
    ${cssObj}
  `;

const title = (newClass) => (props) => {
  return <h1 class={toClass(newClass)}>{props.children}</h1>;
};

const Title = title(context.redDotted);
<Title>A red title</Title>;
```

### Using `ThemeProvider`

Solidjs offers a context

```js
import { styled, ThemeProvider } from "solid-styled-components";

const theme = {
  colors: {
    primary: "hotpink",
  },
};

const myTitle = styled("h1")`
  color: ${(props) => props.theme.colors.primary};
`;
```

## Overriding CSS in JS

Suppose we have a base component with class `base` and we want to override the CSS.

We can also do CSS in JS with the package "solid-styled-components".

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
import { toClass} from "...";

const overTitle = (newclass) => (props) =>
  <h1 class={toClass(base+newClass)}}> {props.children}</h1>;

const BaseTitle = overTitle();
<BaseTitle>A red title</BaseTitle>;

const BlueTitle = overTitle(blue);
<BlueTitle> A blue title </BlueTitle>;
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
