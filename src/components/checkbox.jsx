import { css } from "solid-styled-components";

export default (context) => {
  const {
    colors: { grey, blue },
    codes: { chkCross, cross },
  } = context;

  const style = ({ size, content }) => ({
    base: `
      width: ${size}rem;
      height: ${size}rem;
      border-radius: 5px;
      appearance: none;
      outline: none;
      box-sizing: border-box;
      transition: all 0.2s ease-in-out;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      border: 2px solid ${grey[600]};
      position: relative;
      &:hover {
        transform: scale(1.1);
      }
      &:disabled {
        border: 2px dashed;
      }
      &:checked {
        border: 2px solid ${blue[800]};
        background-color: ${blue[800]};
      }
      &:after {
        content: "${content}";
        font-size: ${size}em;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.2s;
        color: ${blue[200]};
        opacity: 0;
      }
      &:checked&:after {
        color: ${grey[200]};
        opacity: 1;
      }
    `,
  });

  return function Checkbox(props) {
    const size = props.size ? props.size : "2";
    const content = props.content ? props.content : chkCross;
    return (
      <input
        class={css`
          ${style({ size, content }).base} + ${props.styles}
        `}
        type="checkbox"
        required="required"
        {...props}
      />
    );
  };
};
