import selectExamples from "../examples/select.examples";
import context from "../pages/context";
import title from "../components/title";

export default function SelectPage(props) {
  const Title = title(context.classes.stdTitle);
  const Select = selectExamples(context);
  return (
    <>
      <Title>Selection</Title>
      <Select>{props.children}</Select>
    </>
  );
}
