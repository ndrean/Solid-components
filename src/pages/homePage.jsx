import { styled, css } from "solid-styled-components";
import context from "./context.js";
import "../index.css";

const Pre = styled("pre")`
  margin-left: 10px;
  padding: 5px;
`;

function home(context) {
  const { colors } = context;

  const context2 = {
    colors: {
      red: "red",
      red1: "#f44336",
      red2: "#b71c1c",
      red3: "#e57373",
      blue: "blue",
    },
  };

  const titleV1 = (color) => (props) =>
    <h4 style={{ color }}>Color is: {color}</h4>;

  const BlueTitle = titleV1(context2.colors.blue);
  // const TitleV12 = titleV2();
  // const TitleV1 = titleV1(context.colors.red[100]);

  const TitleV2 = (props) => (
    <h4 style={{ color: props?.color }}>Color is: {props?.color}</h4>
  );

  const redClass = `
    color: ${colors.red[500]};
  `;

  const extractColor = (myclass) => myclass.trim("\n").split(":")[1];

  const titleV3 = (myclass) => (props) => {
    console.log(myclass);
    return (
      <h4
        class={css`
          ${myclass}
        `}
      >
        {" "}
        Color is: {extractColor(myclass)}
      </h4>
    );
  };

  const TitleV0 = (props) => {
    console.log(props);
    return <h4 {...props}>{props.children}</h4>;
  };

  const TitleV3 = titleV3(redClass);

  const blueClass = `
    color: blue;
  `;

  const cont = {
    blueClass: blueClass,
    defaultClass: redClass,
  };

  const contexedTitle = (context) => (props) =>
    (
      <h4
        class={css`
          ${props?.newClass ? props.newClass : context.defaultClass}
        `}
      >
        {props.children}
      </h4>
    );

  const ContextedTitle = contexedTitle(cont);

  return () => (
    <div style={{ width: "100%", paddingRight: "10px" }}>
      <h4>The pattern used to customize HTML elements with SolidJS.</h4>
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
      <p>
        This pattern gives an easy "static theming" solution. SolidJS provides{" "}
        <code>ThemeProvider</code> via <code>createContext</code> where you can
        change dynamically the theme. It is illustrated in the{" "}
        <a href="https://www.solidjs.com/examples/context" target="#">
          example from the docs
        </a>
        )
      </p>
      <h2>"Traditional" examples</h2>
      <p>Given a context object,</p>
      <Pre>
        <code>
          const context=\u007Bcolors: \u007B red: "red", red100: "#ffcdd2",
          red2: "#b71c1c", red3: "#e57373"\u007D\u007D
        </code>
      </Pre>
      <ul>
        <li>
          <p>
            we can define a "standard" styled component with the{" "}
            <code>style </code> prop with in-line CSS and pass a JS object:
          </p>
          <Pre>
            <code>const RedTitle = () =&gt</code>
            <br />
            <code>
              &nbsp &lth1 style=\u007B\u007Bcolor:
              context.colors.red1\u007D\u007D&gtColor is:
              \u007Bcontext.colors.red1\u007D&lt/h1&gt;
            </code>
          </Pre>
          <p>and use it:</p>
          <code>&ltRedTitle /&gt</code>
          <h4 style={{ color: "red" }}>Color is: {"red"}</h4>
        </li>
        <li>
          <p>
            You can of course use the traditional way to inject CSS in
            components with classes. With SolidJS, you pass the class name (a
            string) to the prop <code>class</code>.
          </p>
          <p>
            Suppose we defined CSS classes "center-blue" in the file
            "index.css".
          </p>
          <Pre>
            <code>.center-blue \u007B</code>
            <br />
            <code>&nbsp text-align: center;</code>
            <br />
            <code>&nbsp color: blue;;</code>
            <br />
            <code>\u007D</code>
          </Pre>
          <p>We define a component:</p>
          <Pre>
            <code>const Title = (props) =&gt</code>
            <br />
            <code>
              &nbsp &lth1
              \u007B...props\u007D&gt\u007Bprops.children\u007D&lt/h1&gt;
            </code>
          </Pre>
          We can now use the CSS classes:
          <Pre>
            <code>
              &ltTitle class=\u007B"center-blue"\u007D&gtIs this blue and
              centered? title&lt/Title&gt
            </code>
          </Pre>
          <TitleV0 class="center-blue">Is this blue and centered?</TitleV0>
        </li>
      </ul>
      <h2>Using the pattern and CSS-in-JS</h2>
      <ul>
        <li>
          <p>We can use the pattern:</p>
          <Pre>
            <code>const title = (color) =&gt (props) =&gt</code>
            <br />
            <code>
              &nbsp &lth1 style=\u007B\u007B color\u007D\u007D&gtColor is:
              \u007Bcolor\u007D&lt/h1&gt;
            </code>
            <br />
            <code>const BlueTitle = title(context.colors.blue);</code>
          </Pre>
          <p>and the component is:</p>
          <Pre>
            <code>&ltBlueTitle /\&gt</code>
          </Pre>
          <BlueTitle />
        </li>
        <hr />
        <li>
          We can pass the style we want via a prop, say <code>color </code>:
          <Pre>
            <code>const TitleV2 = (props) =&gt</code>
            <br />
            <code>
              &nbsp &lth1 style=\u007B\u007Bcolor:
              props?.color\u007D\u007D&gtColor is:
              \u007Bprops?.color\u007D&lt/h1&gt
            </code>
            <br />
            <Pre />
            <p>We can use it: </p>
            <code>&ltTitleV2 /&gt</code>
            <br />
            <code>
              &ltTitleV2 color=\u007Bcontext.colors.red2\u007D&gt Color is:
              \u007Bprops?.color\u007D &lt/TitleV2&gt
            </code>
            <br />
          </Pre>
          <TitleV2 />
          <TitleV2 color={context2.colors.red2} />
        </li>
        <hr />
        <li>
          We can uses classes for more complex CSS with <code>css</code> from
          "solid-styled-components" and CSS-in-JS for small apps like this one:
          <Pre>
            <code>
              const defaultClass = `color: $\u007Bcolors.red[500]\u007D`;
            </code>
            <br />
            <code>const blueClass = `color: blue;`;</code>
            <br />
            <code>
              const context = \u007B classes: \u007B defaultClass, blueClass
              \u007D\u007D
            </code>
          </Pre>
          <Pre>
            <code>
              const toClass = (myclass) =&gt css`$\u007Bmyclass\u007D`
            </code>
            <br />
            <code>const extractColor = (myclass) =&gt</code>
            <br />
            <code>&nbsp myclass.trim("\u005cn").split(":")[1]</code>
          </Pre>
          <Pre>
            <code>const title = (context) =&gt (props) =&gt</code>
            <br />
            <code>&nbsp &lth4 class=\u007Bcss`</code>
            <br />
            <code>
              &nbsp &nbsp $\u007Bprops?.newClass ? props.newClass :
              context.classes.defaultClass\u007D&gt
            </code>
            <br />
            <code>&nbsp `\u007D&gt</code>
            <br />
            <code>&nbsp &nbsp \u007Bprops.children\u007D </code>
            <br />
            <code>&nbsp &lt/h4&gt</code>
            <br />
          </Pre>
          <Pre>
            <code>const Title = title(context)</code>
          </Pre>
          <Pre>
            <code>&ltTitle&gtDefault class&lt/Title&gt</code>
            <br />
            <code>
              &ltTitle newClass=\u007Bcontext.classes.bleuClass \u007D&gtwith
              newClass&lt/Title&gt
            </code>
          </Pre>
          <ContextedTitle>Default class</ContextedTitle>
          <ContextedTitle newClass={cont.blueClass}>
            with newClass
          </ContextedTitle>
        </li>
      </ul>
      <p>
        Take a look at the Readme or the code for more examples, in particular
        how to override the CSS classes or define dynamic classes.
      </p>
    </div>
  );
}

export default () => {
  const Home = home(context);
  return <Home />;
};
