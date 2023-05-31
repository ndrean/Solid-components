import spinnerExample from "./spinner.examples";
import context from "../context";

export default function SpinerPage() {
  const SpinnerExample = spinnerExample(context);
  return <SpinnerExample />;
}
