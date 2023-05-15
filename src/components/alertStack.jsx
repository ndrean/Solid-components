import { For, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { styled, css, keyframes } from "solid-styled-components";

import alert from "./alert";

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

const deleteAfterDuration = 5e3;

////////

export default (context) => {
  const { limit } = context;
  const [msgs, setMsgs] = createStore([]);
  const Alert = alert(context);

  function setStatus(id, status) {
    setMsgs((curr) => curr.id === id, "status", status);
  }

  function remove(id) {
    setStatus(id, "removing");
    setMsgs((curr) => curr.filter((msg) => msg.id !== id));
  }

  function add(component) {
    const newMsg = {
      id: Math.random().toString(10).split(".")[1],
      component,
      status: "inserting",
    };

    if (msgs.length >= limit) {
      const [f, ...rest] = msgs;
      remove(f.id);
    }

    setMsgs((curr) => [...curr, newMsg]);
    setTimeout(() => setStatus(newMsg.id, "inserted"), 400);
    setTimeout(() => remove(newMsg.id), deleteAfterDuration);
  }

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
            <Alert
              message={message}
              severity={severity}
              onRemove={(e) => console.log(e.currentTarget)}
            />
          )}
        </For>
      </div>
    );
  };

  return { AlertStack, msgs, add };
};
