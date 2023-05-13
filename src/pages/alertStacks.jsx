import { alertStackExamples } from "../components/alertStack.examples";

const context = {
  colors: { red, teal, orange, blue },
};

const AlertStackExamples = alertStackExamples(context);

export default function AlertStacks() {
  return <AlertStackExamples />;
}
