import { styled } from "solid-styled-components";

export default (context) => {
  const {
    theme: { palette, shadows },
  } = context;

  return (optCss) => styled("dialog")`
    border: none;
    padding: 10px;
    box-shadow: ${shadows[4]};
    background: ${palette.primary.background};
    margin-left: ${(props) => (props.left ? props.left + "px" : "auto")};
    margin-top: ${(props) => (props.top ? props.top + "px" : "auto")};
    ${optCss};
  `;
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
    myref.reset();
  }
}
