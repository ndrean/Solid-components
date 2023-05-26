import { css } from "solid-styled-components";

import { hamburgerSVG } from "./svgs";
import button from "./button";

export default (context) => (props) => {
  const headerCss = css`
    background-color: #333333;
    color: white;
    padding: 5px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
  `;

  const headerTitle = css`
    margin-left: 15px;
  `;

  const Button = button(context);
  const HamburgerSVG = hamburgerSVG(context);

  return (
    <div class={headerCss}>
      <Button onClick={props.toggle} aria-label="btn">
        <HamburgerSVG color={"orange"} />
      </Button>
      <p class={headerTitle}>Components & CSS with SolidJS</p>
    </div>
  );
};
