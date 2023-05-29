import buttonExamples from "./button.examples";
import context from "../context.js";

export default function ButtonsPage() {
  const ButtonExamples = () => buttonExamples(context);
  return <ButtonExamples />;
}
