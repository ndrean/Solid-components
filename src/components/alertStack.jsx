import { For, createEffect } from "solid-js";
import { styled, css, keyframes } from "solid-styled-components";

import alert from "./alert";

export default (context) => {
  const Alert = alert(context);
  const animationFadeIn = keyframes({
    "0%": { transform: "scale(0.5)", opacity: 0 },
    "100%": { transform: "scale(1)", opacity: 1 },
  });
  const animationFadeOut = keyframes({
    "0%": { transform: "scale(1)", opacity: 1 },
    "100%": { transform: "scale(0)", opacity: 0 },
  });

  const animation = {
    inserting: {
      animation: `${animationFadeIn} 0.5s`,
    },
    removing: {
      animation: `${animationFadeOut} 0.5s`,
    },
  };

  const AlertStack = (props) => {
    return (
      <div
        class={css`
          min-width: 300px;
          max-width: 600px;
          position: fixed;
          right: 1rem;
          top: 1rem;
          z-index: 10;
        `}
      >
        <For each={props.messages}>
          {({ component: { severity, message } }) => (
            <Alert message={message} severity={severity} />
          )}
        </For>
      </div>
    );
  };
  return AlertStack;
};
