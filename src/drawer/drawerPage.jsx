import drawerExample from "./drawer.example";
import context from "../context";

export default function DrawerPage() {
  const DrawerExample = (props) => drawerExample(context);
  return <DrawerExample />;
}
