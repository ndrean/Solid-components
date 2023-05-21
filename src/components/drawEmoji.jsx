import { css } from "solid-styled-components";

export default (emoji, size = 48, name = "hamburger") =>
  () =>
    (
      <span
        class={css`
          font-size: ${size}px;
        `}
        role="img"
        aria-label={name}
      >
        {emoji}
      </span>
    );
