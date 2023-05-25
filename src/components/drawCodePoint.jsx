import { css } from "solid-styled-components";

export default () => (props) => {
  const size = () => props?.size || 48;
  const code = String.fromCodePoint(props?.codePoint) || null;

  return (
    <span
      class={css`
        font-size: ${size()}px;
      `}
    >
      {code}
    </span>
  );
};
