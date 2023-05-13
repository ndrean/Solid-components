import alertExamples from "../components/alert.examples";
import { red, orange, teal, blue } from "material-ui-colors";

const context = {
  colors: { red, teal, orange, blue },
};

const AlertExamples = alertExamples(context);

export default function Alerte() {
  return <AlertExamples />;
}
