import { styled } from "solid-styled-components";
import context from "./context.js";

const Pre = styled("pre")`
  margin-left: 10px;
  padding: 5px;
`;

function home(context) {
  const { tr } = context;
  return (
    <>
      <h1>{tr.t("A demo of customized HTML elements with SolidJS.")}</h1>
      <p>
        We will use the following pattern to customize components as found in
        this repo: "https://github.com/FredericHeem/mdlean".
      </p>
      <p>
        It defines a closure that takes an argument <code>context </code>
        and renders a function component.
      </p>
      <Pre>
        <code>
          const comp = (context) =&gt (props) =&gt component( context, props)
        </code>
        <br />
        <code>const ContextedComp = comp(someContext)</code>
        <br />
        <code>
          &ltContextedComp \u007B...props\u007D&gt \u007Bprops.children\u007D
          &ltContextedComp&gt
        </code>
      </Pre>
      <br />
      <p>Here is an example:</p>
      <Pre>
        <code>
          const title = (context) =&gt (props) =&gt &lth1
          \u007B...props\u007D&gt \u007Bprops.children\u007D &lt/h1&gt;
        </code>
      </Pre>
      <p>
        Suppose we defined CSS classes "red-dotted" and "blue-solid". We define
        a general object "context":
      </p>
      <Pre>
        <code>
          const context = \u007B redclass: "red-dotted", blueclass: "blue-solid"
          \u007D
        </code>
      </Pre>
      We can now define customized components using the <code>context </code>{" "}
      object:
      <Pre>
        <code>const Title = title(context)</code>
        <br />
        <code>
          &ltTitle class=\u007Bcontext.redclass\u007D &gt My red title
          &lt/Title&gt
        </code>
        <br />
        <code>
          &ltTitle class=\u007Bcontext.blueclass\u007D &gt My blue title
          &lt/Title&gt
        </code>
      </Pre>
    </>
  );
}

export default function Home() {
  const HomeExample = () => home(context);
  return <HomeExample />;
}
