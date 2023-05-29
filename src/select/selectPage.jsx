import selectExamples from "./select.examples";
import context from "../context";

export default function SelectPage() {
  const Select = selectExamples(context);
  return <Select />;
}
