import dynamicExamples from "./dynamic.examples";
import loading from "./loading";
import context from "../../context";

export default function DynamicPage() {
  const DynamicExamples = dynamicExamples(context);
  const Loading = loading();
  return (
    <Suspense fallback={<Loading />}>
      <DynamicExamples />
    </Suspense>
  );
}
