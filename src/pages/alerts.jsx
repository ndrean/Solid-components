import alertExamples from "../components/alert.examples";

const context = {
  colors: { red: "red", teal: "teal", orange: "orange", blue: "blue" },
};

const AlertExamples = alertExamples(context);

export default function Alerte() {
  return <AlertExamples />;
}
