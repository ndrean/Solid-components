import { createBrowserHistory } from "history";
import alertExamples from "../components/alert.examples";

const context = {
  tr: {
    t: (v) => v,
  },
  history: createBrowserHistory(),
  colors: { red: "red", teal: "pink", orange: "orange", blue: "blue" },
};

const AlertExamples = alertExamples(context);

export default function Alerte() {
  return <AlertExamples />;
}
