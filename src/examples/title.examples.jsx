import { css } from "solid-styled-components";

import {
  title,
  tClass,
  tClassProps,
  tStyled,
  cStyled,
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
  const T0 = title();
  const T0C = title(context);

  const TC = tClass();
  const TCN = tClass(blueRightGrey);
  const TCP = tClassProps();

  const TS = tStyled();
  const TCS = cStyled({ newClass: blueRightGrey });

  return (
    <>
      <T0>No style title</T0>
      <T0C
        class={css`
          ${context.myclass}
        `}
      >
        added class via the context
      </T0C>
      <TC>With base class</TC>
      <TCN>Arg class blueRightGrey</TCN>

      <TCP>empty class props</TCP>
      <TCP newClass={blueRightGrey}>via class prop blueRightGrey</TCP>

      <br />

      <TS>Styled Basic</TS>
      <TS>Styled predefined with css object</TS>
      <TCS>ola</TCS>
    </>
  );
}
