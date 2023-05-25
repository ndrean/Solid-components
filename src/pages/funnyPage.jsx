import funnyExamples from "../examples/funny.examples";
import context from "../context";

export default function FunnyPage() {
  const FunnyPage = funnyExamples(context);
  return <FunnyPage />;
}
