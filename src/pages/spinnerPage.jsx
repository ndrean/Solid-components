import spinnerExample from "../examples/spinner.examples";
import context from "../context";

export default function SpinerPage() {
  const SpinnerExample = () => spinnerExample(context);
  return <SpinnerExample />;
}
