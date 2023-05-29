import { createSignal } from "solid-js";
import { css } from "solid-styled-components";
import drawer from "../components/drawer";
import button from "../components/button";
import { dTitle } from "../components/utilities/title";
import menu from "./menu";
import "../index.css";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
  } = context;

  const Drawer = drawer(context);
  const [drawerOpen, setDrawOpen] = createSignal(false);
  const toggleDrawer = () => setDrawOpen((val) => !val);

  const Title = dTitle("h1", stdTitle);
  const Menu = menu(context);
  const Button = button(context);

  const navChangeExample = (newItem) => {
    window.alert("going to..." + newItem.text);
    setTimeout(() => setDrawOpen(false), 400);
  };

  return () => (
    <section id="drawer">
      <Title>{tr.t("Drawer")}</Title>

      <p>An example of the drawer used of the side menu of the app:</p>
      <Button fullWidth ripple onClick={toggleDrawer}>
        OPEN DRAWER
      </Button>
      <Drawer open={drawerOpen()} onClose={() => setDrawOpen(false)}>
        <Menu navChange={(item) => navChangeExample(item)} />
      </Drawer>
    </section>
  );
};
