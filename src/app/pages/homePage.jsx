import { styled, css } from "solid-styled-components";
import { A } from "@solidjs/router";

import context from "../../context.js";
import Link from "../Link.jsx";
import { title, dTitle } from "../title.jsx";
import "../../index.css";
import dialogComponent from "../../dialog/dialogComponent.jsx";
import usersArticle from "./usersArticle.jsx";
import button from "../../button/button.jsx";

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
  let diag;
  const Dialog = dialogComponent(context);
  const UsersArticle = usersArticle(context);
  const Button = button(context);

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

      <T2>
        <code> CONTEXT </code> of this app
      </T2>
      <p>
        The CONTEXT is static. The modal below displays the content of the
        CONTEXT object. The initial render shows that CONTEXT does not contain
        any field "data". We populate the context with users' data when we
        navigate to the "PRE FETCH" page. Return here and check that the modal
        displays the current CONTEXT.
      </p>
      <Button raised primary fullWidth onClick={() => diag.showModal()}>
        show data context
      </Button>
      <Dialog ref={diag}>
        <p>The users'data will be populated from the context.</p>
        <UsersArticle usersData={context.data} />
        <Button raised accent onClick={() => diag.close()}>
          Close
        </Button>
        <br />
        <details>
          <summary>The CONTEXT</summary>

          <p>{JSON.stringify(context, null, "\t")}</p>
        </details>
      </Dialog>
      {/*  */}

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
        We define a customized component that uses the context object. We use{" "}
        <code> css </code>
        from the package <strong>"solid-styled-components"</strong>.
      </p>
      <p>
        We can read props given to the component. When we want to override
        classes, we simply add "oldClass + newClass" (in this order).
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
      </Pre>
      <details>
        <summary>Show!</summary>
        <PropsT2 label="Red-dotted" />
        <PropsT2 newClass={contextDemo.classes.blueSolid} label="Blue solid" />
      </details>
      <p>
        When we only want to modify the CSS, we can also use{" "}
        <code> styled </code> from the library. For example, we can use a base
        style for different <code> H </code> tags and add some more styling:
      </p>
      <Pre>
        <code>const title = (ctx)=&gt</code>
        <br />
        <code>&nbsp(tag, css, optCss="") =&gt </code>
        <br />
        <code>&nbsp &nbsp styled(tag)`</code>
        <br />
        <code>&nbsp &nbsp &nbsp $\u007Bcss\u007D;</code>
        <br />

        <code>&nbsp &nbsp &nbsp $\u007BOptCss\u007D;</code>
        <br />
        <code>&nbsp &nbsp &nbsp`</code>
      </Pre>
      <p>Alternatively:</p>
      <Pre>
        <code>const sTitle = (context) =&gt</code>
        <br />
        <code>&nbsp (tag, base) =&gt</code>
        <br />
        <code>&nbsp &nbsp styled(tag)((props) =&gt \u007B</code>
        <br />
        <code>&nbsp &nbsp &nbsp return props.newClass ?</code>
        <br />
        <code>&nbsp &nbsp &nbsp &nbsp base + props.newClass :</code>
        <br />
        <code> &nbsp &nbsp &nbsp &nbspbase;</code>
        <br />
        <code>&nbsp&nbsp\u007D);</code>
      </Pre>
      <p>We can use it:</p>
      <Pre>
        <code>const center = `text-align: center;`</code>
      </Pre>
      <Pre>
        <code>const T3C = title(ctx)("h3", blueSolid, center)</code>
        <br />
        <code>&ltT3C&gt H3 blueSolid centered&lt/T3C&gt</code>
        <br />
      </Pre>
      <p>or with the second version:</p>
      <Pre>
        <br />
        <code>const T3 = title(context)("h3", blueSolid)</code>
        <br />
        <code>
          &ltT3 newClass=\u007Bcenter\u007D&gtBlue solid Centered&ltT3&gt
        </code>
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
