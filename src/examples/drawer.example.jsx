import { createSignal } from "solid-js";

import drawer from "../components/drawer";
import button from "../components/button";
import { dynTitle } from "../components/title";
import menu from "./menu";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
  } = context;

  const Title = dynTitle(stdTitle, "h1");
  const Menu = menu(context);
  const Drawer = drawer(context);
  const Button = button(context);

  const [drawerOpen, setDrawOpen] = createSignal(false);

  const toggleDrawer = () => setDrawOpen((val) => !val);

  const navChangeExample = (newItem) => {
    window.alert("going to..." + newItem.text);
    setTimeout(() => setDrawOpen(false), 400);
  };

  return (
    <section id="drawer">
      <Title>{tr.t("Drawer")}</Title>
      <p>
        The logic of this component is to toggle a state via a button, and pass
        it as a prop. The CSS of the component will change, in particular its{" "}
        <code> opacity </code> and <code> z-index </code>.
      </p>
      <br />
      <Button fullWidth ripple onClick={toggleDrawer}>
        OPEN DRAWER
      </Button>
      <Drawer open={drawerOpen()} onClose={() => setDrawOpen(false)}>
        <Menu navChange={(item) => navChangeExample(item)} />
      </Drawer>
    </section>
  );
};
