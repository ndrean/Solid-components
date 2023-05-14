import alertExamples from "../examples/alert.examples";
import { red, orange, teal, blue } from "material-ui-colors";

const context = {
  colors: { red, teal, orange, blue },
  tr: {
    t: (v) => v,
  },
};

const AlertExamples = alertExamples(context);

export default function Alerts() {
  return <AlertExamples />;
}
