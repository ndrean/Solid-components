import modalExample from "../examples/modal.example";
import context from "./context";

export default function ModalPage() {
  const ModalExample = () => modalExample(context);
  return <ModalExample />;
}
