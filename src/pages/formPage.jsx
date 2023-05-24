import formExample from "../examples/form.example";
import context from "../context";

const FormExample = () => formExample(context);

export default function FormPage() {
  return <FormExample />;
}
