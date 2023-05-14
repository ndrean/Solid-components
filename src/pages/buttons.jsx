import buttonExamples from "../examples/button.examples";
import { red, orange, teal, blue, grey } from "material-ui-colors";
import fbIcon from "../icons/facebook.svg";

const context = {
  colors: { red, teal, orange, blue, grey },
  borderRadius: "4px",
  tr: {
    t: (v) => v,
  },
  icon: fbIcon,
};

const ButtonExamples = buttonExamples(context);

export default function Buttons() {
  return <ButtonExamples />;
}
