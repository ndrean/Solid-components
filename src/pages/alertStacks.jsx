import { alertStackExamples } from "../examples/alertStack.examples";

const context = {
  colors: { red, teal, orange, blue },
  tr: {
    t: (v) => v,
  },
};

const AlertStackExamples = alertStackExamples(context);

export default function AlertStacks() {
  return <AlertStackExamples />;
}
