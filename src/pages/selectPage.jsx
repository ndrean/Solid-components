import selectExamples from "../examples/select.examples";
import context from "../context";

export default function SelectPage() {
  const Select = selectExamples(context);
  return <Select />;
}
