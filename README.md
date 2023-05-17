# Pattern for customized functional components with SolidJS

100% based on: <https://github.com/FredericHeem/mdlean>

## Status

Building...<https://test-solid.surge.sh>

## Pattern

We define a closure that takes an argument context and renders a function component.

```js
const comp = (context) => (props) => component( context, props)

const ContextedComp = comp(someContext)

<ContextedComp {...props}>{props.children} </ContextedComp>
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

```js
const Title = title(context)

<Title class={context.redclass}> My red title</Title>
<Title class={context.blueclass}> My blue title</Title>
```
