import formExample from "./form.example";
import context from "../context";

export default function FormPage() {
  const FormExample = () => formExample(context);
  return <FormExample />;
}
