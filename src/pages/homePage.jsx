import { styled, css } from "solid-styled-components";
import { A } from "@solidjs/router";

import context from "../context.js";
import Link from "../components/Link.jsx";
import { title, dTitle } from "../components/title.jsx";
import "../index.css";

const Pre = styled("pre")`
  margin-left: 10px;
  padding: 5px;
  background-color: aliceblue;
`;

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

  const center = `text-align: center;`;

  const T2V0 = (props) => <h4 {...props}>{props.children}</h4>;
  const PropsT2 = title(contextDemo);
  const T1 = dTitle("h1", stdTitle);
  const T2 = dTitle("h2");
  const T3 = dTitle("h3", blueSolid);
  const T3Center = dTitle("h3", blueSolid, center);
  // const HRLine = T2(hrLine);

  return () => (
    <section id="homePage">
      <T1>Pattern for functional components with SolidJS</T1>

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
      <T2>The pattern</T2>
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
        via
        <code> createContext</code>.
      </p>
      <p>
        {" "}
        The later is described in the{" "}
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

      <T2>Traditional CSS</T2>
      <p>We define a component:</p>
      <Pre>
        <code>const T4 = (props) =&gt</code>
        <br />
        <code>
          &nbsp &lth4 \u007B...props\u007D&gt\u007Bprops.children\u007D&lt/h4&gt
        </code>
        <br />
      </Pre>
      <p>
        We can style it in-line and pass a JS object (with keys in dash-form
        with explicit units):
      </p>
      <Pre>
        <code>&ltT4 style= \u007B\u007B"font-size":"2em"\u007D\u007D &gt</code>
        <br />
        <code>&nbsp Big T4</code>
        <br />
        <code>&lt/T4&gt</code>
        <br />
      </Pre>
      <details>
        <summary>Show!</summary>
        <T2V0 style={{ "font-size": "2em" }}>Big T2</T2V0>
      </details>
      <p>
        SolidJS provides the prop <code> class </code>
        to pass a CSS class name. Suppose we have a CSS classe "center-blue"
        defined in the file "index.css".
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
        <code>&ltT2V0 class="center-blue"&gt</code>
        <br />
        <code>&nbsp Blue and solid T2</code>
        <br />
        <code>&lt/T2V0&gt</code>
        <br />
      </Pre>
      <details>
        <summary>Show!</summary>
        <T2V0 class="center-blue">Blue and solid T2</T2V0>
      </details>
      <T2>Using the pattern with CSS-in-JS</T2>
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
        <code>const T2 = (ctxt) =&gt </code>
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
        <code>&nbsp &nbsp &nbsp props.newClass ? </code>
        <br />
        <code>&nbsp &nbsp &nbsp &nbsp base + props.newClass : </code>
        <br />
        <code>&nbsp &nbsp &nbsp &nbsp base;</code>
        <br />
        <code>&nbsp &nbsp const label = </code>
        <br />
        <code> &nbsp &nbsp &nbsp props.label || </code>
        <br />
        <code>&nbsp &nbsp &nbsp props.children;</code>
        <br />
        <code>&nbsp return (</code>
        <br />
        <code>&nbsp &nbsp &lth2</code>
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
        <code>&nbsp &nbsp &lt/h2&gt</code>
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

        <code>const PT2 = T2(ctxt);</code>
        <br />
        <code>&ltPT2 label="Red dotted"/&gt</code>
        <br />
        <code>&ltPT2</code>
        <br />
        <code>&nbsp newClass=\u007BblueSolid\u007D</code>
        <br />
        <code>&nbsp label="Blue solid"</code>
        <br />
        <code>/&gt</code>
        <br />
        <code>&ltPT2</code>
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
        <PropsT2 label="Red-dotted" />
        <PropsT2 newClass={contextDemo.classes.blueSolid} label="Blue solid" />
        <PropsT2 newClass={contextDemo.classes.solid}>Red solid</PropsT2>
      </details>
      <p>
        We can also use <code> styled </code> from the library. For example, we
        can use a base style for different <code> H </code> tags and add some
        more styling:
      </p>
      <Pre>
        <code>const title = (ctx)=&gt (tag, css, optCss="") =&gt </code>
        <br />
        <code>&nbsp styled(tag)`</code>
        <br />
        <code>&nbsp $\u007Bcss\u007D; with CTX dependencies</code>
        <br />

        <code>&nbsp $\u007BOptCss\u007D;</code>
        <br />
        <code>`</code>
      </Pre>
      <p>We can use it:</p>
      <Pre>
        <code>const center = `text-align: center;`</code>
      </Pre>
      <Pre>
        <code>const T3 = title(context)("h3", blueSolid)</code>
        <br />
        <code>const T3Center = title("h3", blueSolid, center)</code>
        <br />
        <code>\u003C T3\u003E H3 blueSolid centered\u003C H3\u003E</code>
      </Pre>
      <p>and use it:</p>
      <Pre>
        <code>&ltT3&gtExample&lt/T3&gt</code>
        <br />
        <code>&ltT3Center&gtCentered&lt/T3Center&gt</code>
      </Pre>
      <details>
        <summary>Show!</summary>
        <T3>Example</T3>
        <T3Center>Centered</T3Center>
      </details>
    </section>
  );
}

export default () => {
  const Home = home(context);
  return <Home />;
};
