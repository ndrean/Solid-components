import { styled } from "solid-styled-components";

import context from "../context.js";
import { dynTitle, propsTitle } from "../components/title.jsx";
import Link from "../components/Link.jsx";
import "../index.css";

const Pre = styled("pre")`
  margin-left: 10px;
  padding: 5px;
  background-color: #f1f1f1;
`;

function home(context) {
  const {
    colors,
    classes: { stdTitle, hrLine },
  } = context;

  const blueSolid = `
    color: blue;
    border: solid 4px;
  `;

  const redClass = `
    color: ${colors.red[500]};
    border: dotted 2px;
  `;

  const solid = `
    border: solid 4px;
  `;

  const contextDemo = {
    classes: {
      blueSolid,
      solid,
      base: redClass,
    },
  };

  const TitleV0 = (props) => <h4 {...props}>{props.children}</h4>;
  const PropsTitle = propsTitle(contextDemo);
  const Title1 = dynTitle(stdTitle, "h1");
  const Title = dynTitle("", "h2");
  // const HRLine = title(hrLine);

  return () => (
    <div style={{ width: "100%" }}>
      <Title1>Pattern for functional components with SolidJS</Title1>

      <p>
        This work is 100% based on the{" "}
        <Link href="https://github.com/FredericHeem/mdlean" target="#">
          MDLean
        </Link>{" "}
        repo adapted for SolidJS. It uses{" "}
        <Link href="https://github.com/solidjs/solid-router" target="#">
          Solid-Router
        </Link>
        and{" "}
        <Link
          href="https://github.com/solidjs/solid-styled-components"
          target="#"
        >
          Solid-Styled-Components
        </Link>{" "}
        to produce a fast and very light-weight bundle.
      </p>
      <Title>The pattern</Title>
      <p>
        You define a closure that takes an argument - the context - and renders
        a function component.
      </p>
      <Pre>
        <code>const comp = (context) =&gt</code>
        <br />
        <code> &nbsp(props) =&gt component(context, props);</code>
        <br />
        <code>const ContextedComp = comp(someContext);</code>
        <br />
        <code>&ltContextedComp \u007B...props\u007D&gt</code>
        <br />
        <code>&nbsp \u007Bprops.children\u007D</code>
        <br />
        <code> &lt/ContextedComp&gt;</code>
        <br />
      </Pre>
      <p>
        This allows to pass a "static" theme without using{" "}
        <code> ThemeProvider </code> via
        <code> createContext </code>. The later is described in the{" "}
        <Link href=" https://www.solidjs.com/examples/context" target="#">
          doc "context" example
        </Link>
        .
      </p>
      <p>
        \u2757 do <strong>NOT</strong> destructure the props. Take a look at
        "Funny/Dynamic Components".
      </p>

      <Title>Traditional CSS</Title>
      <p>We define a component:</p>
      <Pre>
        <code>const Title = (props) =&gt</code>
        <br />
        <code>
          &nbsp &lt h1
          \u007B...props\u007D&gt\u007Bprops.children\u007D&lt/h1&gt
        </code>
      </Pre>
      <p>
        We can use the style prop to define in-line CSS and pass a JS object
        (with keys in dash-form with explicit units):
      </p>
      <Pre>
        <code>
          &ltTitle
          style=\u007B\u007Bcolor:"red","font-size":"2em"\u007D\u007D&gt
        </code>
        <br />
        <code>&nbsp Color is "red</code>
        <br />
        <code>&lt/Title&gt</code>
      </Pre>
      <details>
        <summary>Show!</summary>
        <TitleV0 style={{ color: "red", "font-size": "1.5em" }}>
          Color is "red"
        </TitleV0>
      </details>
      <p>
        SolidJS provides the prop <code> class </code> to pass a CSS class name.
        Suppose we define CSS classe "center-blue" in the file "index.css".
      </p>
      <Pre>
        <code>.center-blue \u007B</code>
        <br />
        <code>&nbsp text-align: center;</code>
        <br />
        <code>&nbsp color: blue;</code>
        <br />
        <code>\u007D</code>
      </Pre>
      <p>We use the class prop:</p>
      <Pre>
        <code>&ltTitleV0 class="center-blue"&gt</code>
        <br />
        <code>&nbsp Blue and solid title</code>
        <br />
        <code>&lt/TitleV0&gt</code>
      </Pre>
      <details>
        <summary>Show!</summary>
        <TitleV0 class="center-blue">Blue and solid title</TitleV0>
      </details>
      <Title>Using the pattern with CSS-in-JS</Title>
      <p>
        We can use CSS-in-JS with the library{" "}
        <Link
          href="https://github.com/solidjs/solid-styled-components"
          target="#"
        >
          "solid-styled-components"
        </Link>
        . Lets copy-paste CSS into JS and create a "context" object:
      </p>
      <Pre>
        <code>//context.js</code>
        <br />
        <code>const base = `color:red; border:dotted 1px;`</code>
        <br />
        <code>const blueSolid = `</code>
        <br />
        <code>&nbsp color:blue; border:solid 1px;`</code>
        <br />
        <code>const solid = `border:solid 2px;`</code>
        <br />
        <code>
          export default \u007Bclasses:\u007Bbase,solid,blueSolid\u007D\u007D
        </code>
      </Pre>
      <p>
        We can now define customized components that use the context object. We
        use <code> css </code> from the package{" "}
        <strong>"solid-styled-components"</strong>.
      </p>
      <p>
        When we want to override classes, we simply add "oldClass + newClass"
        (in this order).
      </p>
      <Pre>
        <code>import \u007B css \u007D from "solid-styled-components";</code>
        <br />
        <code>const title = (context) =&gt (props) =&gt \u007B</code>
        <br />
        <code>
          &nbsp const \u007B classes: \u007B base \u007D\u007D = context;
        </code>
        <br />
        <code>&nbsp const newclass = </code>
        <br />
        <code>&nbsp &nbsp props?.newClass ? </code>
        <br />
        <code>&nbsp &nbsp&nbsp base + props.newClass : </code>
        <br />
        <code>&nbsp &nbsp&nbsp base;</code>
        <br />
        <code>&nbsp const label = props?.label || props.children;</code>
        <br />
        <code>&nbsp return (</code>
        <br />
        <code>
          &nbsp &nbsp &lth4 class=\u007Bcss`$\u007Bnewclass\u007D`\u007D
          \u007B...props\u007D&gt
        </code>
        <br />
        <code>&nbsp &nbsp &nbsp \u007Blabel\u007D</code>
        <br />
        <code>&nbsp &nbsp &lt/h4&gt</code>
        <br />
        <code>&nbsp )</code>
        <br />
        <code>\u007D</code>
      </Pre>

      <Pre>
        <code>import context from "./context.js";</code>
        <br />
        <code>
          const \u007Bclasses: \u007BblueSolid, solid\u007D\u007D = context;
        </code>
        <br />

        <code>const PTitle = title(context);</code>
        <br />
        <code>&ltPTitle label="Red dotted"/&gt</code>
        <br />
        <code>
          &ltPTitle newClass=\u007BblueSolid\u007D label="Blue solid"/&gt
        </code>
        <br />
        <code>&ltPTitle newClass=\u007Bsolid\u007D label="Red solid"/&gt</code>
      </Pre>
      <details>
        <summary>Show!</summary>
        <PropsTitle label="Red-dotted" />
        <PropsTitle
          newClass={contextDemo.classes.blueSolid}
          label="Blue solid"
        />
        <PropsTitle newClass={contextDemo.classes.solid}>Red solid</PropsTitle>
      </details>
    </div>
  );
}

export default () => {
  const Home = home(context);
  return <Home />;
};
