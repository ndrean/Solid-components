import { css } from "solid-styled-components";
import "../index.css";
import {
  myTitle,
  myTitle2,
  title,
  classTitle,
  propStyled,
  contextStyled,
  propClassTitle,
} from "../components/title";

import context from "../pages/context";
import "../index.css";

const blueDotted = `
  color: blue;
  border: dotted 1px;
  cursor: pointer;
`;

const left2Shadow = `
  font-size: 1em;
  border: solid 2px;
  padding-left: 10px;
  text-align: left;
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, 0.2);
`;

const blueRightGrey = `
  font-size: 1em;
  color: blue;
  text-align: right;
  background-color: grey;
`;

const theme = {
  colors: {
    primary: "red",
  },
};

export default function TitleExamples() {
  const T = title();
  const TC = title(context);
  const T2 = myTitle2(left2Shadow);
  const context2 = { myclass: left2Shadow };
  const TCon = title(context2);
  const TCSS = myTitle(
    css`
      ${left2Shadow}
    `
  );

  const CT = classTitle();
  const CT2 = classTitle(blueRightGrey);

  const PCT = propClassTitle();
  const PS = propStyled();
  const PS2 = contextStyled({ newClass: blueRightGrey });

  return (
    <>
      <p>Different possible implementations</p>
      <TC
        class={css`
          ${context.classes.testclass}
        `}
      >
        first
      </TC>
      <T2>test</T2>
      <TCSS>centered?</TCSS>
      <T>No style title</T>
      <T class="center">Simple styled title</T>
      <TCon
        class={css`
          ${context2.myclass}
        `}
      >
        added class via the context
      </TCon>

      <CT>With base class</CT>
      <CT2>Arg class blueRightGrey</CT2>

      <br />

      <PS>Styled Basic</PS>
      <PS2>Styled predefined with css object</PS2>

      <PCT newClass={blueDotted}>class via props</PCT>
    </>
  );
}
