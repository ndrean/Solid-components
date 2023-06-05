import { css } from "solid-styled-components";

export default (props) => {
  const size = () => props?.size || 48;
  const code = props?.codePoint ? String.fromCodePoint(props?.codePoint) : 0;

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
