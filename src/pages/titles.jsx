import { A } from "@solidjs/router";

import { TitleV1, BaseH1Obj, BaseH1Props } from "../components/title";
import Home from "../pages/home";
import "../index.css";

export default function Titles() {
  const customCss = "color: blue; border: dotted 1px;cursor: pointer;";
  const customCss2 =
    "border: none; color: green; box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);";

  const TitleV3 = BaseH1Obj();
  const TitleV3Custom = BaseH1Obj({ css: customCss });
  const TitleV4 = BaseH1Props();
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
          <p>Second version with styled</p>
          <div class="center">
            <TitleV3>V3 base</TitleV3>

            <TitleV3Custom>V3 custom</TitleV3Custom>
            <hr />
            <TitleV4>V4 base</TitleV4>
            <p>
              Styled with object <code>css: "{customCss}"</code>
            </p>
            <TitleV4Custom css={customCss2}>V4 custom</TitleV4Custom>
            <p>
              Styled with the prop: <code>"{customCss2} </code>
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
