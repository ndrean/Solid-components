import { styled } from "solid-styled-components";

export default ({ colors, borderRadius }) => {
  const { red, grey, blue } = colors;

  const rootStyle = (borderRadius) => `
    cursor: pointer;
    color: black;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 0.5rem;
    min-width: 4rem;
    min-height: 2.5rem;
    outline: none;
    border: none;
    border-radius: ${borderRadius};
    background: transparent;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;
    transition: background-color 0.3s;
    &:before {
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: calc(50% - 100%);
      left: calc(50% - 100%);
      width: 200%;
      height: 200%;
      transition: opacity 250ms linear;
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
      content: "";
    };
    &:active {
      &:before {
        opacity: 1;
      }
    };
    &:hover {
      &:before {
        opacity: 0.5;
      }
    };
  `;

  const styles = {
    root: rootStyle(borderRadius),
    flat: `
      border-width: 0;
    `,
    flatPrimary: `
      color: ${blue[400]};
    `,
    flatAccent: `
      color: ${red[300]};
    `,
    // raised: `
    //   box-shadow: ${shadows[2]};
    //   transition: ${transitions.create(["box-shadow"], {
    //     easing: transitions.easing.easeOut,
    //     duration: transitions.duration.leavingScreen,
    //   })};
    //   :active {
    //     box-shadow: ${shadows[8]};
    //   };
    // `,
    raisedPrimary: `
      background-color: ${grey[100]};
      color: ${red[400]};
    `,
    raisedAccent: `
      background-color: ${grey[100]};
      color: ${red[400]};
    `,
    disabled: `
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
      box-shadow: ${10};
    `,
    raisedDisabled: `
      background-color: rgba(0, 0, 0, 0.12);
    `,
    fullWidth: `
      text-align: center;
      width: 100%;
    `,
    icon: `
      padding: 0.4rem;
    `,
    ripple: `
      position: relative;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      &:after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(circle, #000 10%, transparent 10%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform 0.5s, opacity 1s;
      };
      &:active&:after {
        transform: scale(0, 0);
        opacity: 0.2;
        transition: 0s;
      };
    `,
  };

  return styled("button")(
    (props) =>
      `${
        styles.root +
        (props.flat ? styles.flat : "") +
        (props.accent ? styles.flatAccent : "") +
        (props.primary ? styles.flatPrimary : "") +
        (props.ripple ? styles.ripple : "") +
        (props.disabled ? styles.disabled : "") +
        (props.fullWidth ? styles.fullWidth : "")
      }
    `
  );
};
