import { red, orange, teal, blue, grey, pink } from "material-ui-colors";

const shadows = {
  1: "6px 6px 2px 1px rgba(0, 0, 255, .2);",
  2: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
  3: "3px 3px 2px 1px rgba(0, 0, 255, .2)",
  4: "0px 3px 3px 0px rgba(0,0,0,0.14)",
  10: "rgba(0, 0, 0, 0.2) 0px 6px 6px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 4px 18px 3px;",
};

const defColors = {
  grey: { 1: "#f1f1f1", 2: "#d8d8d8" },
  blueGrey: { 1: "#c4dfff", 2: "#b0c8e5" },
  redPink: { 1: "#f50057" },
  muiBlue: { 1: "#ebedf7", 2: "#3f51b5", 3: "#1f285a" },
  blue: { dark: "#0d2e46", midnight: "#191970", lightMidnight: "#e8e8f0" },
  bisque: "#ffe4c4",
  greenTeal: "#008080",
};

const context = {
  colors: { red, teal, orange, blue, grey, pink },
  shadows,
  defColors,
  theme: {
    bg: {
      bisque: defColors.bisque,
      lightGrey: defColors.grey[1],
      darkBlue: defColors.blue.dark,
    },
    text: {
      1: defColors.blue.midnight,
      2: defColors.blue.dark,
    },
  },

  tr: {
    t: (v) => v,
  },
  codes: {
    cross: "\u274C",
    check: "\u2705",
    chkCross: "\u2718",
    exclam: "\u2757",
    tick: "\u2713",
  },
  classes: {},
  signals: { modalConditions: false, dialogConditions: false },
};

context.classes.stdTitle = `
  border: none; 
  color: ${context.theme.text[1]};
  padding-left: 12px;
  background-color: ${context.theme.bg.bisque};
  box-shadow: ${context.shadows[2]};
  `;

context.classes.stdContainer = `
overflow-y: scroll;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
`;

context.classes.hrLine = `
position: relative;
margin: 10px auto;
text-align: left;
&:after{
  content:" ";
  height: 2px;
  width: 100%;
  background: midnightblue;
  display: block;
  position: relative;
  top: 50%;
  right: 0;
}
`;

export default context;
