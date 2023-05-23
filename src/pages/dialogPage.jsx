import dialogExample from "../examples/dialog.example";
import context from "./context";

export default function DialogPage() {
  const DialogExample = () => dialogExample(context);
  return <DialogExample />;
}
