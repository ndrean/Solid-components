import buttonExamples from "../examples/button.examples";
import context from "../context.js";

export default function Buttons() {
  const ButtonExamples = () => buttonExamples(context);
  return <ButtonExamples />;
}
