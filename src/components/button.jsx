import { styled } from "solid-styled-components";

export default (context) => {
  const {
    colors: { red, grey, blue },
    theme: { shadows },
  } = context;

  const rootStyle = `
    cursor: pointer;
    color: black;
    margin: 5px 5px 5px 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 0.5rem;
    min-width: 4rem;
    min-height: 2.5rem;
    outline: none;
    border: none;
    border-radius: ;
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
    root: rootStyle,
    flat: `
      border-width: 0;
    `,
    flatPrimary: `
      color: ${blue[400]};
    `,
    flatAccent: `
      color: ${red[400]};
    `,
    raised: `
       box-shadow: ${shadows[4]};
        &:active {
          box-shadow: ${shadows[8]};
        };
    `,
    raisedPrimary: `
      background-color: ${blue[400]};
      color: white;
    `,
    raisedAccent: `
      background-color: ${red[400]};
      color: white;
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
        (props.accent ? styles.flatAccent : styles.flat) +
        (props.primary ? styles.flatPrimary : styles.flat) +
        (props.ripple ? styles.ripple : styles.flat) +
        (props.raised ? styles.raised : styles.flat) +
        (props.disabled ? styles.disabled : styles.flat) +
        (props.raised && props.primary ? styles.raisedPrimary : styles.flat) +
        (props.raised && props.accent ? styles.raisedAccent : styles.flat) +
        (props.disabled && props.raised ? styles.raisedDisabled : styles.flat) +
        (props.fullWidth ? styles.fullWidth : styles.flat)
      }
      `
  );
};
