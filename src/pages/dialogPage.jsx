import dialogrefExample from "../examples/dialogref.example";
import context from "./context";

export default function DialogPage() {
  const DialogExample = () => dialogrefExample(context);
  return <DialogExample />;
}
