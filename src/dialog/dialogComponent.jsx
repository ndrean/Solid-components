import { css } from "solid-styled-components";

export default (context) => {
  const {
    theme: { palette, shadows },
  } = context;

  const baseStyle = (props) => `
  border: none;
  padding: 0px 10px 0px 10px;
  box-shadow: ${shadows[4]};
  background: ${palette.primary.background};
  margin-left: ${props.left ? props.left + "px" : "auto"};
  margin-top: ${props.top ? props.top + "px" : "auto"};
  `;

  return (props) => (
    <dialog
      class={css`
        ${baseStyle(props) + props?.optCss}
      `}
      {...props}
    >
      {props.children}
    </dialog>
  );
};

//to understand what is left, right...and the constraints, just check the picture
//at https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect
export function resetIfOut(e, myref) {
  const { left, right, bottom, top } = myref.getBoundingClientRect();
  if (
    e.clientX < left ||
    e.clientX > right ||
    e.clientY < top ||
    e.clientY > bottom
  ) {
    return true;
  }
  return false;
}
