import { css } from "solid-styled-components";

import { hamburgerSVG } from "../../typo/svgs";
import button from "../../button/button";

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
    <header class={headerCss}>
      <Button onClick={props.toggle} aria-label="open-nav">
        <HamburgerSVG color="orange" />
      </Button>
      <p class={headerTitle}>Components with SolidJS</p>
    </header>
  );
};
