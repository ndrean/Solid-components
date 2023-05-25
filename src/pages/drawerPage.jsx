import drawerExample from "../examples/drawer.example";
import context from "../context";

export default function DrawerPage() {
  const DrawerExample = () => drawerExample(context);
  return <DrawerExample />;
}
