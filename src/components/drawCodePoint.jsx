import { css } from "solid-styled-components";

export default (codePoint, width = 0) => (
  <span
    class={css`
      font-size: 48px;
    `}
  >
    {String.fromCodePoint(codePoint)}
  </span>
);
