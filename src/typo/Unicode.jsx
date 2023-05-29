import { css } from "solid-styled-components";

const Unicode = (props) => (
  <span
    class={css`
      font-size: ${props?.size};
    `}
  >
    {props?.code}
  </span>
);

export default Unicode;
