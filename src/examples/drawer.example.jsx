/** @jsxImportSource @emotion/react */
// import { css } from "solid-styled-components";
import { createSignal } from "solid-js";

import drawer from "../components/drawer";
import button from "../components/button";
import { BaseH1Props } from "../components/title";
import menu from "./menu";

export default (context) => {
  const { tr, customCss } = context;
  const Title = BaseH1Props();
  const [drawerOpen, setDrawOpen] = createSignal(false);

  const navChange = (newItem) => {
    window.alert("going to..." + newItem.text);
    setTimeout(() => setDrawOpen(false), 400);
  };

  const Menu = menu(context);
  const Drawer = drawer(context);
  const Button = button(context);

  return (
    <section id="drawer">
      <Title css={customCss}>{tr.t("Drawer")}</Title>
      <br />
      <Button ripple onClick={() => setDrawOpen((val) => !val)}>
        OPEN DRAWER
      </Button>
      <Drawer open={drawerOpen()} onClose={() => setDrawOpen(false)}>
        <Menu navChange={(item) => navChange(item)} />
      </Drawer>
    </section>
  );
};
