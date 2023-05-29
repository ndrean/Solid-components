import checkboxExamples from "./checkbox.examples";
import context from "../context.js";

export default function Checkboxes() {
  const CheckboxExamples = () => checkboxExamples(context);
  return <CheckboxExamples />;
}
