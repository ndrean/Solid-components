import { createSignal } from "solid-js";
import { styled } from "solid-styled-components";

import drawer from "../components/drawer";
import button from "../components/button";
import { dynTitle } from "../components/title";
import menu from "./menu";
import { tickSVG } from "../components/svgs";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
  } = context;

  let diagDrawer;

  const Title = dynTitle(stdTitle, "h1");
  const Menu = menu(context);
  const Drawer = drawer(context);
  const Button = button(context);
  // const Nav = nav(context);
  const TickSVG = tickSVG(context);

  const [drawerOpen, setDrawOpen] = createSignal(false);
  // const [dialogOpen, setDialogOpen] = createSignal(false);

  const toggleDrawer = () => setDrawOpen((val) => !val);

  const navChangeExample = (newItem) => {
    window.alert("going to..." + newItem.text);
    setTimeout(() => setDrawOpen(false), 400);
  };

  const AbsContainer = styled("div")`
    position: absolute;
    top: 0;
    left: 0;
  `;

  const Dialog = styled("dialog")`
    position: fixed;
    border: none;
    margin: 0;
    top: 60px;
    left: 0;
    background: #f1f1f1;
  `;

  const Blacked = styled("div")`
    font-weight: bold;
  `;
  return (
    <section id="drawer">
      <Title>{tr.t("Drawer")}</Title>

      <br />
      <Button fullWidth ripple onClick={() => diagDrawer.showModal()}>
        OPEN A DIALOG BOX
      </Button>
      <AbsContainer>
        <Dialog ref={diagDrawer}>
          <Blacked>
            <h1>Hello from Dailog!</h1>
            <Button fullWidth ripple onClick={() => diagDrawer.close()}>
              <TickSVG size={60} /> Bye!
            </Button>
          </Blacked>
        </Dialog>
      </AbsContainer>
      <Button fullWidth ripple onClick={toggleDrawer}>
        OPEN DRAWER
      </Button>
      <Drawer open={drawerOpen()} onClose={() => setDrawOpen(false)}>
        <Menu navChange={(item) => navChangeExample(item)} />
      </Drawer>
      <p>{diagDrawer.returnValue}</p>
    </section>
  );
};
