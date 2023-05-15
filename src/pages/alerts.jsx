import alertExamples from "../examples/alert.examples";
import context from "./context.js";

export default function Alerts() {
  const AlertExamples = () => alertExamples(context);
  return <AlertExamples />;
}
