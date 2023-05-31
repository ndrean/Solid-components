// import { styled } from "solid-styled-components";

// export function dialogPositionned(context) {
//   const {
//     theme: { palette, shadows },
//   } = context;

//   const DialogPosition = styled("dialog")`
//     border: none;
//     border-radius: 5px;
//     box-shadow: ${shadows[4]};
//     padding: 10px;
//     position: fixed;
//     border: none;
//     margin: ${(props) => (props.top || props.left ? undefined : "auto")};
//     top: ${(props) => props.top || undefined}px;
//     left: ${(props) => props.left || undefined}px;
//     background: ${palette.primary.background};
//     transition: opacity 0.5s ease-in;
//   `;

//   const AbsContainer = styled("div")`
//     position: absolute;
//     top: 0;
//     left: 0;
//   `;

//   return (props) => (
//     <AbsContainer>
//       <DialogPosition
//         ref={props.ref}
//         top={props.top}
//         left={props.left}
//         {...props}
//       >
//         {props.children}
//       </DialogPosition>
//     </AbsContainer>
//   );
// }

// //to understand what is left, right...and the constraints, just check the picture
// //at https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect
// export function clickOut(e, myref) {
//   const { left, right, bottom, top } = myref.getBoundingClientRect();
//   if (
//     e.clientX < left ||
//     e.clientX > right ||
//     e.clientY < top ||
//     e.clientY > bottom
//   ) {
//     myref.reset();
//   }
// }
