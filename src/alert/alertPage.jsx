import alertExamples from "./alert.examples";
import context from "../context.js";

export default function AlertPage() {
  const AlertExamples = () => alertExamples(context);
  return <AlertExamples />;
}
