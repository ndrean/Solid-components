import { css } from "solid-styled-components";

export default (context) => {
  const {
    shadows,
    theme: { bg },
  } = context;

  const baseStyle = (props) => `
  border: none;
  padding: 0;
  max-height: 60svh;
  overflow-y: scroll;
  box-shadow: ${shadows[4]};
  background: ${bg.lightGrey};
  margin-left: ${props.left ? props.left + "px" : "auto"};
  margin-top: ${props.top ? props.top + "px" : "auto"};
  
  `;
  // &:backdrop {
  //   backdrop-filter: blur(25px);
  //   transition: backdrop-filter .5s ease;
  // }

  return (props) => {
    function clickOut(target) {
      if (target.id === props.id) document.getElementById(props.id).close();
    }

    return (
      <dialog
        {...props}
        class={css`
          ${baseStyle(props) + props?.optCss}
        `}
        onClick={({ target }) => clickOut(target)}
      >
        {props.children}
      </dialog>
    );
  };
};
