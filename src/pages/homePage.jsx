import { styled } from "solid-styled-components";

import context from "./context.js";
import title, { extendedTitle } from "../components/title.jsx";
import Link from "../components/Link.jsx";
import "../index.css";

const Pre = styled("pre")`
  margin-left: 10px;
  padding: 5px;
`;

function home(context) {
  const {
    colors,
    classes: { stdTitle },
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
  const cont = {
    classes: {
      blueSolid,
      solid,
      base: redClass,
    },
  };

  const TitleV0 = (props) => <h4 {...props}>{props.children}</h4>;
  const ExtendedTitle = extendedTitle(cont);
  const Title = title(stdTitle);

  return () => (
    <div style={{ width: "100%" }}>
      <Title>Pattern for functional components with SolidJS</Title>

      <p>
        This work is 100% based on the{" "}
        <Link href="https://github.com/FredericHeem/mdlean" target="#">
          following repo
        </Link>
      </p>
      <h2>The pattern</h2>
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
        <code>
          &ltContextedComp \u007B...props\u007D&gt\u007Bprops.children\u007D
          &lt/ContextedComp&gt;
        </code>
        <br />
      </Pre>
      <p>
        This allows to pass a "static" theme without using ThemeProvider via
        createContext, as described in the{" "}
        <Link href=" https://www.solidjs.com/examples/context" target="#">
          doc "context" example
        </Link>
        .
      </p>
      <p>
        \u2757 do <strong>NOT</strong> destructure the props.
      </p>

      <h2>"Traditional" CSS file</h2>
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
          &ltTitle style=\u007B\u007B color: "red", "font-size": "2em"
          \u007D\u007D&gtColor is "red"&gt\Title&gt
        </code>
      </Pre>
      <TitleV0 style={{ color: "red", "font-size": "2em" }}>
        Color is "red"
      </TitleV0>
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
      <p>We can simply use the class name:</p>
      <Pre>
        <code>
          &ltTitleV0 class="center-blue"&gtBlue and solid title&lt/TitleV0&gt
        </code>
      </Pre>
      <TitleV0 class="center-blue">Blue and solid title</TitleV0>
      <h2>Using the pattern with CSS-in-JS</h2>
      <p>
        We can use CSS-in-JS with the library solid-styled-components. Lets
        copy-paste CSS into JS and create a "context" object:
      </p>
      <Pre>
        <code>const base = `color: red; border: dotted 1px;`</code>
        <br />
        <code>const blueSolid = `color: blue; border: solid 1px;`</code>
        <br />
        <code>const solid = `border: solid 2px;`</code>
        <br />
        <code>
          export default \u007B classes: \u007B base, solid, blueSolid
          \u007D\u007D
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
        <code>
          &nbsp const newclass = props?.newClass ? base + props.newClass : base;
        </code>
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

        <code>const ContextedTitle = title(context);</code>
        <br />
        <code>&ltContextedTitle label="Title is red-dotted" /&gt</code>
        <br />
        <code>
          &ltContextedTitle newClass=\u007BblueSolid\u007D&gt Blue solid title
          &lt/ContextedTitle&gt
        </code>
        <br />
        <code>
          &ltContextedTitle newClass=\u007Bsolid\u007D&gtRed
          solid&lt/ContextedTitle&gt
        </code>
      </Pre>
      <ExtendedTitle label="Title is red-dotted" />
      <ExtendedTitle
        newClass={cont.classes.blueSolid}
        label="Blue solid title"
      />
      <ExtendedTitle newClass={cont.classes.solid}>Red solid</ExtendedTitle>
    </div>
  );
}

export default () => {
  const Home = home(context);
  return <Home />;
};
