import inputExamples from "./input.examples";
import context from "../context";

export default function InputsPage() {
  const InputExamples = inputExamples(context);
  return <InputExamples />;
}
