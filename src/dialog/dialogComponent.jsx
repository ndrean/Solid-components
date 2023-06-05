import { css } from "solid-styled-components";
// import { createSignal } from "solid-js";

export default (context) => {
  const {
    shadows,
    theme: { bg },
  } = context;

  const baseStyle = (props) => `
  border: none;
  padding: 0;
  max-height: 70svh;
  overflow-y: scroll;
  box-shadow: ${shadows[4]};
  background: ${bg.lightGrey};
  margin-left: ${props.left ? props.left + "px" : "auto"};
  margin-top: ${props.top ? props.top + "px" : "auto"};
  transition: opacity .5s ease-3;
  &:backdrop {
    backdrop-filter: blur(25px);
    transition: backdrop-filter .5s ease;
  }
  `;

  return (props) => {
    const clickOut = ({ target }) => {
      if (target.nodeName === "DIALOG")
        document.getElementById(props.id).close();
    };

    return (
      <dialog
        {...props}
        class={css`
          ${baseStyle(props) + props?.optCss}
        `}
        onClick={clickOut}
      >
        {props.children}
      </dialog>
    );
  };
};
