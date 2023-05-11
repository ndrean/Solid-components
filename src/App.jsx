import clsx from "clsx";
import logo from "./logo.svg";
import styles from "./App.module.css";
import { css, styled } from "solid-styled-components";

const titleClass = (args) => css({ color: args.color });

const MyStyledTitle = styled("h1")((props) => ({
  color: props.color || "blue",
  "font-size": props.fontSize || "3rem",
}));

const styledTitle = (args) => {
  return styled("h1")(() => ({
    color: args.color,
  }));
};

const StyledTitle = (props) => {
  const Component = styledTitle({ color: "blue" });
  return <Component>{props.children}</Component>;
};

const MyTitle = (props) => {
  const Classe = titleClass({ color: "pink" });
  return <h1 class={Classe}>Fifth</h1>;
};

function Title(props) {
  const classes = Object.keys(props)
    .filter((key) => key !== "children")
    .reduce((acc, key) => acc + " " + props[key], "");

  return (
    <h1
      class={clsx({
        [classes]: classes.length > 0,
        "h1-title": classes.length === 0,
      })}
    >
      {props.children || "Hi"}
    </h1>
  );
}
function App() {
  return (
    <div class={styles.App}>
      <div class="">
        <button class="btn">Click me!</button>
        <button class="abtn">Click me 2!</button>
        <Title />
        <Title theme="h1-title-green">Second</Title>
        <Title
          colors="text-red-400 text-4xl bg-slate-300"
          hover="hover:bg-sky-700"
        >
          Third
        </Title>
        <MyStyledTitle>Fourth</MyStyledTitle>
        <MyStyledTitle color="yellow" fontSize={"1.5rem"}>
          Yellow
        </MyStyledTitle>
        <MyTitle>Fifth</MyTitle>
        <StyledTitle>Sixth</StyledTitle>
      </div>
    </div>
  );
}

export default App;
