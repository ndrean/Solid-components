import { For } from "solid-js";
import { styled, css, keyframes } from "solid-styled-components";

import alert from "./alert";

export default (context, { limit = 3 }) => {
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

  const alertView = ({ message }) => {
    // const css = animation[message.status];
    const { component } = message;
    const AlertView = styled("div")(`
    margin: 10,
    padding: 10,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
  `);
    return <AlertView>{component}</AlertView>;
  };

  return function AlertStack() {
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
        <For each={messages}>{(message) => <Alert message={message} />}</For>
      </div>
    );
  };
};
