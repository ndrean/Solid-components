import { red, orange, teal, blue, grey } from "material-ui-colors";
import fbIcon from "../assets/facebook.svg";

const stdContainer = `
  overflow-y: scroll;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
`;

const stdTitle = `
  border: none; 
  text-align: left;
  padding-left: 12px;
  background-color: ${orange[50]};
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, .2);
  `;

const shadows = {
  1: "6px 6px 2px 1px rgba(0, 0, 255, .2);",
  10: "rgba(0, 0, 0, 0.2) 0px 6px 6px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 4px 18px 3px;",
};

const testCss = `
font-size: 1em;
border: solid 1px;
padding: 0px 10px;
text-align: right;
`;

export default {
  colors: { red, teal, orange, blue, grey },
  borderRadius: "4px",
  theme: {
    shadows,
    palette: {
      primary: {
        main: "#fffff",
        contrastText: "no se senor",
      },
    },
  },
  background: { default: grey },
  shadows: shadows,
  tr: {
    t: (v) => v,
  },
  icon: fbIcon,
  limit: 4,
  classes: {
    customCss: stdTitle,
    stdTitle,
    testclass: testCss,
    stdContainer: stdContainer,
    testCss,
  },
};
