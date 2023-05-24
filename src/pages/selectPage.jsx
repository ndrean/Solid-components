import selectExamples from "../examples/select.examples";
import context from "../context";
import { dynTitle } from "../components/title";

export default function SelectPage(props) {
  const Title = dynTitle(context.classes.stdTitle, "h1");
  const Select = selectExamples(context);
  return (
    <>
      <Title>Selection</Title>
      <Select>{props.children}</Select>
    </>
  );
}
