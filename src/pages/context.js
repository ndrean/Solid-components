import { red, orange, teal, blue, grey } from "material-ui-colors";
import fbIcon from "../icons/facebook.svg";

const customTitleCss = `
  border: none; 
  text-align: left;
  padding-left: 12px;
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, .2);
  `;

const shadows = { 1: "6px 6px 2px 1px rgba(0, 0, 255, .2);" };

export default {
  colors: { red, teal, orange, blue, grey },
  borderRadius: "4px",
  shadows: shadows,
  tr: {
    t: (v) => v,
  },
  icon: fbIcon,
  limit: 3,
  customCss: customTitleCss,
};
