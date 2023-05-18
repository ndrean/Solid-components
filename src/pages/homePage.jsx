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
      <h1>
        {tr.t("The pattern used to customize HTML elements with SolidJS.")}
      </h1>
      <p>
        The pattern is shamelessly copied from this repo:
        "https://github.com/FredericHeem/mdlean".
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
      <p>Here is a simple example:</p>
      <Pre>
        <code>
          const title = (context) =&gt (props) =&gt &lth1
          \u007B...props\u007D&gt \u007Bprops.children\u007D &lt/h1&gt;
        </code>
      </Pre>
      <p>
        With SolidJS, you can define the CSS of a component by passing the class
        name (a string) to the prop <code>class</code>.
      </p>
      <p>
        Suppose we defined CSS classes "red-dotted" and "blue-solid" in the file
        "index.css". We define an object <code>context</code>:
      </p>
      <Pre>
        <code>// context.js </code>
        <br />
        <code>import "index.css"</code>
        <br />
        <code>
          export default= \u007B redDotted: "red-dotted", blueSolid:
          "blue-solid" \u007D
        </code>
      </Pre>
      We can now define customized components using the <code>context </code>{" "}
      object:
      <Pre>
        <code>import context from "./context.js"</code>
        <br />
        <code>import title from "..."</code>
        <br />
        <code>const Title = title(context)</code>
        <br />
        <code>
          &ltTitle class=\u007Bcontext.redDotted\u007D&gtMy red
          title&lt/Title&gt
        </code>
        <br />
        <code>
          &ltTitle class=\u007Bcontext.blueSolid\u007D&gtMy blue
          title&lt/Title&gt
        </code>
      </Pre>
      <p>
        Take a look at the Readme or the code for more examples, in particular
        how to override the CSS classes or define dynamic classes.
      </p>
    </>
  );
}

export default () => {
  const Home = home(context);
  return <Home />;
};
