# Pattern for customized functional components with SolidJS

This work is 100% based on [the following repo](https://github.com/FredericHeem/mdlean) adapted for SolidJS.

It uses [Solid Router](https://github.com/solidjs/solid-router) and [Solid styled components](https://github.com/solidjs/solid-styled-components) to produce a fast and very light-weight bundle.

We don't use `THEMEPROVIDER` via `createContext` but use the pattern below and build custom components such as: `DAILOG`, `MODAL`, `SELECT`, `AUTOCOMPLETE SELECT` with `DATALIST`, `ALERT-STACK`, `DRAWER`, `CHECKBOX`, `BUTTON`, `SPINNERS`...

An example of how to use `ThemeProvider` is shown [in the docs](https://www.solidjs.com/examples/contex).

## Status

Still building... <https://solid-components.surge.sh>

## The pattern

You define a closure that takes an argument - the context - and renders a function component.

```jsx
const comp = (context) => (props) => component(context, props);

const ContextedComp = comp(someContext);

<ContextedComp {...props}>{props.children} </ContextedComp>;
```

This allows to pass a "static" theme without using `ThemeProvider` via `createContext`, as described [in the doc "context" example](https://www.solidjs.com/examples/context).

:exclamation: **do NOT destructure the props**. See the example below.

## "Traditional" CSS file

We define a component:

```js
const TitleV0 = (props) => <h1 {...props}>{props.children}</h1>;
```

We can use the `style` prop to define in-line CSS and pass a JS object with keys in dash-form with explicit units.

```jsx
<TitleV0 style={{ color: "red", "font-size": "2em" }}>Color is "red"</TitleV0>
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

const solid = `border: solid 2px;`;

export default { classes: { base, blueSolid, solid } };
```

We can now define customized components that use the `context` object. We use `css` from the package "solid-styled-components". We are able to read additional props given to the component.

```js
import { css } from "solid-styled-components";

const title = (context) => (props) => {
  const {
    classes: { base },
  } = context;
  const newclass = props.newClass ? base + props.newClass : base;
  const label = props.label || props.children;
  return (
    <h4
      class={css`
        ${newclass}
      `}
      {...props}
    >
      {label}
    </h4>
  );
};
```

and use it:

```jsx
import context from "./context.js";
const {classes: {blueSolid, solid}} = context;

[...]
const CTitle = title(context);

<CTitle>Default title is red-dotted</CTitle>
<CTitle label="Blue solid title"/>
<CTitle newClass={solid}>Blue solid</CTitle>
```

We can also use `styled`from "solid-styled-components" if we only want to change the CSS. This returns a styled function component.

We can use classes (defined via `css`):

```jsx
import { styled } from "solid-styled-components";

const sTitle = (context) =>(tag) =>
    styled(tag)((props) => {
      const {
        classes: { base },
      } = context;
      return props.newClass ? base + props.newClass : base;
    });

const H1 = sTitle(context)("h1");
<H1> A red dotted h1</H1>
<H1 newClass={blueSolid}>Blue solid h1</H1>
```

We can also define:

```jsx
const dynTitle = (tag, css, optCss = "") =>
  style(tag)`
  ${css}
  ${optCss}
`;
```

and use it:

````jsx
const DTitle = dynTitle("h5", base, blueSolid)

## Examples of theme

The "context" object is (based on Material UI colors and HTML color codes):

```js
import { red, orange, teal, blue, grey } from "material-ui-colors";

const context = {
  colors: { red, teal, orange, blue, grey },
  theme: {
    shadows,
    palette: {
      primary: {
        text: "midnightblue",
        background: "#f1f1f1",
        border: "#c4dfff",
      },
      secondary: {
        background: "bisque",
      },
    },
  },
  tr: {
    t: (v) => v,
  },
  classes: {},
};
````

When we see that we use frequently a CSS classe, we add it to the context, and the other local CSS class definitions can be defined locally in the componenent.

```js
context.classes.stdTitle = `
  border: none; 
  text-align: left;
  color: #0D2E46;
  padding-left: 12px;
  background-color: ${context.theme.palette.secondary.background};
  color: ${grey[800]};
  box-shadow: ${context.theme.shadows[2]};
  `;
```

We also define shadows as so:

```js
const shadows = {
  1: "6px 6px 2px 1px rgba(0, 0, 255, .2);",
  2: "2px 2px 5px rgba(0, 0, 0, 0.2)",
  3: "3px 3px 2px 1px rgba(0, 0, 255, .2)",
  10: "rgba(0, 0, 0, 0.2) 0px 6px 6px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 4px 18px 3px;",
};
```
