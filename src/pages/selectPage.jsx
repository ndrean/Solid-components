import select from "../components/select";
import context from "../pages/context";
import title from "../components/title";

export default function SelectPage(props) {
  const Title = title(context.classes.stdTitle);
  const Select = select(context);
  return (
    <>
      <Title>Selection</Title>
      <Select>{props.children}</Select>
    </>
  );
}
