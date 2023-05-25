import formExample from "../examples/form.example";
import context from "../context";

export default function FormPage() {
  const FormExample = () => formExample(context);
  return <FormExample />;
}
