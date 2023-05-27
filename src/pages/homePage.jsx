import { styled, css } from "solid-styled-components";
import { A } from "@solidjs/router";

import context from "../context.js";
import { dynTitle, propsTitle } from "../components/title.jsx";
import Link from "../components/Link.jsx";
import "../index.css";

const Pre = styled("pre")`
  margin-left: 10px;
  padding: 5px;
  background-color: aliceblue;
`;

const Code = (props) => (
  <>
    <code>{props.children}</code>
    <br />
    <br />
  </>
);

const link = css`
  text-decoration: none;
  background-color: beige;
  padding: 3px;
  border-radius: 5px;
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
  const Title1 = dynTitle("h1", stdTitle);
  const Title = dynTitle("h2");
  // const HRLine = title(hrLine);

  return () => (
    <section id="homePage">
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
        <code>const comp = (ctxt) =&gt</code>
        <br />
        <code> &nbsp(props) =&gt component(ctxt, props);</code>
        <br />
        <code>const CtxtComp = comp(someCtxt);</code>
        <br />
        <code>&ltCtxtComp \u007B...props\u007D&gt</code>
        <br />
        <code>&nbsp \u007Bprops.children\u007D</code>
        <br />
        <code> &lt/CtxtComp &gt</code>
        <br />
      </Pre>
      <p>
        This allows to pass a "static" theme without using{" "}
        <code> ThemeProvider </code>
        <br /> via
        <code> createContext </code>
        <br />. The later is described in the{" "}
        <Link href=" https://www.solidjs.com/examples/context" target="#">
          doc "context" example
        </Link>
        .
      </p>
      <p>
        \u2757 do <strong>NOT</strong> destructure the props. Take a look at{" "}
        <A class={link} href="/dynamic">
          Dynamic Components
        </A>
      </p>

      <Title>Traditional CSS</Title>
      <p>We define a component:</p>
      <Pre>
        <code>const Title = (props) =&gt</code>
        <br />
        <code>
          &nbsp &lth1 \u007B...props\u007D&gt\u007Bprops.children\u007D&lt/h1&gt
        </code>
        <br />
      </Pre>
      <p>
        We can use the style prop to define in-line CSS and pass a JS object
        (with keys in dash-form with explicit units):
      </p>
      <Pre>
        <code>
          &ltTitle style= \u007B\u007B"font-size":"2em"\u007D\u007D &gt
        </code>
        <br />
        <code>&nbsp Big title</code>
        <br />
        <code>&lt/Title&gt</code>
        <br />
      </Pre>
      <details>
        <summary>Show!</summary>
        <TitleV0 style={{ "font-size": "2em" }}>Big title</TitleV0>
      </details>
      <p>
        SolidJS provides the prop <code> class </code>
        <br /> to pass a CSS class name. Suppose we define CSS classe
        "center-blue" in the file "index.css".
      </p>
      <Pre>
        <code>.center-blue \u007B</code>
        <br />
        <code>&nbsp text-align: center;</code>
        <br />
        <code>&nbsp color: blue;</code>
        <br />
        <code>\u007D</code>
        <br />
      </Pre>
      <p>We use the class prop:</p>
      <Pre>
        <code>&ltTitleV0 class="center-blue"&gt</code>
        <br />
        <code>&nbsp Blue and solid title</code>
        <br />
        <code>&lt/TitleV0&gt</code>
        <br />
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
        <code>const base = `</code>
        <br />
        <code>&nbsp color:red; border:dotted 1px;`</code>
        <br />
        <code>const blueSolid = `</code>
        <br />
        <code>&nbsp color:blue; border:solid 1px;`</code>
        <br />
        <code>const solid = `border:solid 2px;`</code>
        <br />
      </Pre>
      <p>
        We can now define customized components that use the context object. We
        use <code> css </code>
        <br /> from the package <strong>"solid-styled-components"</strong>.
      </p>
      <p>
        When we want to override classes, we simply add "oldClass + newClass"
        (in this order).
      </p>
      <Pre>
        <code>import \u007B css \u007D from ...</code>
        <br />
        <code>const title = (ctxt) =&gt </code>
        <br />
        <code>&nbsp (props) =&gt \u007B</code>
        <br />
        <code>&nbsp &nbsp const \u007B </code>
        <br />
        <code>&nbsp &nbsp &nbsp classes: \u007B base \u007D</code>
        <br />
        <code>&nbsp &nbsp \u007D = context;</code>
        <br />
        <code>&nbsp &nbsp const newclass = </code>
        <br />
        <code>&nbsp &nbsp &nbsp props?.newClass ? </code>
        <br />
        <code>&nbsp &nbsp &nbsp &nbsp base + props.newClass : </code>
        <br />
        <code>&nbsp &nbsp &nbsp &nbsp base;</code>
        <br />
        <code>&nbsp &nbsp const label = </code>
        <br />
        <code> &nbsp &nbsp &nbsp props?.label || </code>
        <br />
        <code>&nbsp &nbsp &nbsp props.children;</code>
        <br />
        <code>&nbsp return (</code>
        <br />
        <code>&nbsp &nbsp &lth4</code>
        <br />
        <code>
          &nbsp &nbsp &nbsp class=\u007Bcss`$\u007Bnewclass\u007D`\u007D
        </code>
        <br />
        <code>&nbsp &nbsp &nbsp\u007B...props\u007D</code>
        <br />
        <code>&nbsp &nbsp &gt</code>
        <br />
        <code>&nbsp &nbsp &nbsp \u007Blabel\u007D</code>
        <br />
        <code>&nbsp &nbsp &lt/h4&gt</code>
        <br />
        <code>&nbsp )</code>
        <br />
        <code>\u007D</code>
        <br />
      </Pre>

      <Pre>
        <code>import ctxt from "./context.js";</code>
        <br />
        <code>const \u007Bclasses: \u007B</code>
        <br />
        <code>&nbsp blueSolid, solid\u007D\u007D = context;</code>
        <br />

        <code>const PTitle = title(ctxt);</code>
        <br />
        <code>&ltPTitle label="Red dotted"/&gt</code>
        <br />
        <code>&ltPTitle</code>
        <br />
        <code>&nbsp newClass=\u007BblueSolid\u007D</code>
        <br />
        <code>&nbsp label="Blue solid"</code>
        <br />
        <code>/&gt</code>
        <br />
        <code>&ltPTitle</code>
        <br />
        <code>&nbsp newClass=\u007Bsolid\u007D</code>
        <br />
        <code>&nbsp label="Red solid"</code>
        <br />
        <code>/&gt</code>
        <br />
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
    </section>
  );
}

export default () => {
  const Home = home(context);
  return <Home />;
};
