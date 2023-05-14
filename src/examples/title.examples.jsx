import { A } from "@solidjs/router";

import { TitleV1, BaseH1Obj, BaseH1Props } from "../components/title";
import Home from "../pages/home";
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

  return (
    <>
      <ul>
        <li>
          <p>First version with classes defined in "index.jss"</p>
          <div class="center">
            <TitleV1>Default</TitleV1>
            <TitleV1 newClass="dotted-red-title">Red</TitleV1>
            <p>
              New class defined in "index.css" and the prop{" "}
              <code>newClass="red-title"</code>
            </p>
          </div>
          <hr />
        </li>

        <li>
          <p>
            Second version with styled. The CSS msut be defined within{" "}
            <strong>backticks "`"</strong> if you want to use multiline.
          </p>
          <div class="center">
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

      <A href="/" class="btn" component={Home}>
        Home
      </A>
    </>
  );
}
