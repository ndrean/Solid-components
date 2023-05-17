import { css } from "solid-styled-components";

import {
  title,
  classTitle,
  propStyled,
  contextStyled,
  propClassTitle,
} from "../components/title";

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
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
`;

const blueRightGrey = `
  font-size: 1em;
  color: blue;
  text-align: right;
  background-color: grey;
`;

const c = [left2Shadow, blueDotted].join(" ");
export default function TitleExamples() {
  const context = { myclass: left2Shadow };
  const T = title();
  const TC = title(context);

  const CT = classTitle();
  const CT2 = classTitle(blueRightGrey);

  const PCT = propClassTitle();
  const PS = propStyled();
  const PS2 = contextStyled({ newClass: blueRightGrey });

  return (
    <>
      <p>Different possible implementations</p>
      <T>No style title</T>
      <TC
        class={css`
          ${context.myclass}
        `}
      >
        added class via the context
      </TC>

      <CT>With base class</CT>
      <CT2>Arg class blueRightGrey</CT2>

      <br />

      <PS>Styled Basic</PS>
      <PS2>Styled predefined with css object</PS2>

      <PCT newClass={blueDotted}>class via props</PCT>
    </>
  );
}
