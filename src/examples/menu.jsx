import { styled } from "solid-styled-components";
import button from "../components/button";

export default (context) => {
  function menus(authenticated) {
    return [
      {
        route: "/button",
        text: "buttons",
      },
      {
        route: "/alert",
        text: "alerts",
      },
    ];
  }

  const MenuItemView = styled("div")({
    minWidth: 150,
  });

  function MenuItem({ menu, navChange }) {
    const Button = button(context);
    return (
      <MenuItemView>
        <Button
          style={{ justifyContent: "flex-start" }}
          ripple
          fullWidth
          onClick={() => navChange(menu)}
        >
          {menu.text}
        </Button>
      </MenuItemView>
    );
  }

  const MenuView = styled("div")({
    padding: 0,
  });

  function Menu({ navChange }) {
    return (
      <MenuView>
        <For each={menus()}>
          {(menu) => <MenuItem navChange={navChange} menu={menu} />}
        </For>
      </MenuView>
    );
  }
  return Menu;
};
