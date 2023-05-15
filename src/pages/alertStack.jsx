import alertStackExamples from "../examples/alertStack.examples";
import alertStackCreate from "../components/alertStack";
import context from "./context";

context.alertStack = alertStackCreate(context, { limit: 3 });

const AlertStackExamples = alertStackExamples(context);

export default function AlertStack() {
  return <AlertStackExamples />;
}
