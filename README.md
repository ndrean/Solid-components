# SolidJS components, CSS-in-JS and Solid-Router

## Component example

This work is 100% based on [the following repo](https://github.com/FredericHeem/mdlean) adapted for SolidJS.

```jsx
import dialogComponent, {clickOut} from "...";
import button from "...";
import Unicode from "...";
import context from "...";

const myPage = (context) => {
  const Dialog = dialogComponenent(context);
  const Button = button(context);
  const {codes: {cross}} = context;

  return (props) => {
    let dialogRef;
    onMount(()=>
    diagRef.addEventListener('click', (e)=> {
      if (clickOut(e, diagRef)) diagRef.close();
    })
  )

  [...]

  return (
    <>
      <Button fullWidth primary raised onClick={() => dialogRef.showModal()}>
        Open Modal
      </Button>
      <Dialog ref={dialogRef}>
        [...insert content here...]
        <Button primary onClick={() => dialogRef.close()}>
          <Unicode size="1.5em" code={cross} />
        </Button>
      </Dialog>
    </>
  )
 }
}


const MyPage = myPage(context)

<MyPage />
```

## Example with Routing

```jsx
import { useRouteData, useRoutes, A } from "@solidjs/router";
import { styled } from "solid-styled-components";

const routeExample = [
  {
    path: "/api",
    title: "Api",
    data: () => "ok",
    component: lazy(() => import("./app/pages/apiPage"),
  },
];

const api = (context)=> (props) => {
  const msg = useRouteData();
  const P = styled("p")`color: context.colors.blue[700];`
  return (
    <P>
      Now you can use the data: {msg()}
    </P>
  )
}

import context from "..."
export default function ApiPage() {
  const Api = api(context)
  return <Api/>
}

const App = () => {
  const Routes = useRoutes(routeExample);
  const { path, data, componenent } = routeExample[0];
  return (
    <>
      <A href={path} data={data} component={componenent}>
        Go to example
      </A>
      <Routes />;
    </>
  )
}


render(<App/>,...)
```

## Pattern for customized functional components with SolidJS

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

We can use classes (a CSS class, not transformed by `css`):)

```jsx
import { styled } from "solid-styled-components";

const sTitle = (context) =>
  (tag, base) =>
    styled(tag)((props) => {
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

```jsx
const DTitle = dynTitle("h5", base, blueSolid);
```

## Context

The "context" object here is (based on Material UI colors and HTML color codes):

```js
import { red, orange, teal, blue, grey } from "material-ui-colors";
```

When we see that we use frequently a CSS classe, we add it to the context, and the other local CSS class definitions can be defined locally in the componenent.

```js
context.classes.stdTitle = `
  border: none; 
  text-align: left;
  color: #0D2E46;
  padding-left: 12px;
  background-color: ${context.theme.bg.bisque};
  color: ${grey[800]};
  box-shadow: ${context.shadows[2]};
  `;
```

## Note on mobile

View on mobile (within the same WIFI): build it, server it, open it.

```bash
npm run build
http-server ./dist -b 0.0.0.0 -p 8080
```

and navigate with the mobile to <http://127.0.0.1:8080>
