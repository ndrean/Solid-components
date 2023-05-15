import { css } from "solid-styled-components";

export default (emoji, width = 0) => (
  <>
    <p>An emoji: </p>
    <span
      class={css`
        font-size: 48px;
      `}
      role="img"
      aria-label="hamburger"
      width={width}
    >
      {emoji}
    </span>
  </>
);
