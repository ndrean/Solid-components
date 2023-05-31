import dynamicExamples from "./dynamic.examples";
import context from "../../context";

export default function DynamicPage() {
  const DynamicExamples = dynamicExamples(context);
  return <DynamicExamples />;
}
