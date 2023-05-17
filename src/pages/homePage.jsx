import { styled } from "solid-styled-components";
import context from "./context.js";

const Pre = styled("pre")`
  margin-left: 10px;
  padding: 5px;
`;

function home(context) {
  const { tr } = context;
  return () => (
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
        a general object <code>context </code>:
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
        <code>import \u007B css \u007D from "solid-styled-components</code>
        <br />
        <code>const Title = title(context)</code>
        <br />
        <code>
          &ltTitle class=\u007Bcss`$\u007Bcontext.redclass\u007D`\u007D &gt My
          red title &lt/Title&gt
        </code>
        <br />
        <code>
          &ltTitle class=\u007Bcss`$\u007Bcontext.blueclass\u007D`\u007D &gt My
          blue title &lt/Title&gt
        </code>
      </Pre>
      <p>
        You can also override the CSS classes or define dynamic classes. Take a
        look at the Readme.
      </p>
    </>
  );
}

export default () => {
  const Home = home(context);
  return <Home />;
};
