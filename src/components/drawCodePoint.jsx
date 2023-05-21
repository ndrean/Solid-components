import { css } from "solid-styled-components";

export default (codePoint, size = 48) =>
  () =>
    (
      <span
        class={css`
          font-size: ${size}px;
        `}
      >
        {String.fromCodePoint(codePoint)}
      </span>
    );
