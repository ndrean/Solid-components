import { styled } from "solid-styled-components";

export default ({ color, borderRadius, shadows }) => {
  const rootStyle = (color, borderRadius) => `
    cursor: pointer;
    color: ${color[200]};
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
  `;

  const styles = {
    root: rootStyle(color, borderRadius),
    flat: `
      border-width: 0;
    `,
    flatPrimary: `
      background-color: ${color[200]};
      color: ${color[400]};
    `,
    flatAccent: `
      background-color: ${color[100]};
      color: ${color[300]};
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
      background-color: ${color[100]};
      color: ${color[400]};
    `,
    raisedAccent: `
      background-color: ${color[100]};
      color: ${color[400]};
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
      ::after {
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
      :active::after {
        transform: scale(0, 0);
        opacity: 0.2;
        transition: 0s;
      };
    `,
  };

  return styled("button")((props) => {
    console.log(props);
    return `${
      (props.ripple ? styles.ripple : styles.root) +
      (props.disabled ? styles.disabled : styles.root) +
      (props.fullWidth ? styles.fullWidth : styles.root)
    }`;
  });
};
