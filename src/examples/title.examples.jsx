import {
  BaseH1Obj,
  BaseH1Props,
  t1,
  t2,
  title,
  title2,
} from "../components/title";
import "../index.css";

export default function TitleExamples() {
  const customCss = `
  color: blue; 
  border: dotted 1px;
  cursor: pointer;`;

  const customCss2 = `
  border: none; 
  text-align: left;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  `;

  // Usage of the component that returns a styled "h1"
  // 1. with an object whose key is "css"
  const TitleV3 = BaseH1Obj();
  const TitleV3Custom = BaseH1Obj({ css: customCss });
  // 2. with props whose key is "css"
  const TitleV4 = BaseH1Props();
  // define a prop css="css string"
  const TitleV4Custom = BaseH1Props();

  const T0 = t1();
  const T1 = t1("dotted-red-title");
  const T2 = t2();

  const context = { myclass: "dotted-red-title" };
  const Title = title(context);
  const Title2 = title2(context);

  return (
    <>
      <Title>Starting</Title>
      <Title2 class={context.myclass}>test??</Title2>
      <ul>
        <li>
          <p>
            You can use classes defined in a CSS file, "index.jss". Given that
            the classes <code>.base-title </code> and{" "}
            <code>.override-title </code>
            are defined in "index.jss", you can pass it into the "class" prop:
          </p>
          <code>
            <pre>const title = (newclass) =&gt (props) =&gt (</pre>
            <pre>
              &nbsp &lth1 class=\u007B ["base-title", newclass].join(" ") \u007D
              &gt
            </pre>
            <pre>&nbsp &nbsp \u007B props.children \u007D</pre>
            <pre>&nbsp &lt/h1&gt</pre>
            <pre>)</pre>
            <pre>const Title = title()</pre>
            <pre>&ltTitle&gtBase class&ltTitle&gt</pre>
          </code>
          <T0>Base class</T0>
          <code>
            <pre>const NewTitle = title("override-title")</pre>
            <pre>&ltNewTitle&gtOverride class&ltNewTitle/&gt</pre>
          </code>
          <T1>Override class</T1>
          <p>
            New class defined in "index.css" and the prop{" "}
            <code>newClass="red-title"</code>
          </p>
          <hr />
        </li>
        <li>
          <p>You can also use props:</p>
          <code>
            <pre>const title = () =&gt (props) =&gt (</pre>
            <pre>
              &nbsp &lth1 class=\u007B ["base-title", props.newclass].join(" ")
              \u007D &gt
            </pre>
            <pre>&nbsp &nbsp \u007B props.children \u007D</pre>
            <pre>&nbsp &lt/h1&gt</pre>
            <pre>)</pre>
            <pre>const Title = title()</pre>
            <p> and use it as:</p>
            <pre>
              &ltTitle newclass="override-title"&gt via props &ltTitle&gt
            </pre>
          </code>
          <T2 newclass="dotted-red-title">via props</T2>
        </li>
        <li>
          <p>
            Second version with styled. The CSS msut be defined within{" "}
            <strong>backticks "`"</strong> if you want to use multiline.
          </p>
          <div>
            <T1>T1 here</T1>
            <TitleV3>V3 base</TitleV3>

            <TitleV3Custom>V3 custom</TitleV3Custom>
            <p>
              Styled overwritten with object <code>css: "{customCss}"</code>{" "}
              when defining the component
            </p>
            <hr />
            <TitleV4>V4 base</TitleV4>
            <TitleV4Custom css={customCss2}>V4 custom</TitleV4Custom>
            <p>
              Styled overwritten with the prop: <code>"{customCss2} </code> when
              using this component
            </p>
          </div>
        </li>
      </ul>
    </>
  );
}
