import preFetchExamples from "../examples/prefetch.examples";
import context from "../context";

export default function PreFetchPage() {
  const PreFetchExamples = preFetchExamples(context);
  return <PreFetchExamples />;
}
