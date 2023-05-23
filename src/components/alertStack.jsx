import { For } from "solid-js";
import { createStore } from "solid-js/store";
import { styled, css, keyframes } from "solid-styled-components";

import alert from "./alert";

const animationFadeIn = keyframes`
  0% {  opacity: 0 }
  100% {  opacity: 1 }
`;

const animationFadeOut = keyframes`
  0% { opacity: 1 }
  100% {  opacity: 0 }
`;

const animations = {
  inserting: animationFadeIn,
  removing: animationFadeOut,
};

const alertView = (animation) =>
  styled("div")`
    margin: 10px;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    animation: ${animation} 1s linear;
  `;

////////
const deleteAfterDuration = 5e3;
const limit = 4;

export default (context) => {
  const [msgs, setMsgs] = createStore([]);

  function setStatus(id, status) {
    setMsgs((curr) => curr.id === id, "status", status);
  }

  function remove(id) {
    setStatus(id, "removing");
    setTimeout(
      () => setMsgs((curr) => curr.filter((msg) => msg.id !== id)),
      400
    );
  }

  function add(component) {
    const newMsg = {
      id: Math.random().toString(10).split(".")[1],
      component,
      status: "inserting",
    };

    if (msgs.length >= limit) {
      remove(msgs[0].id);
    }

    setMsgs((curr) => [...curr, newMsg]);
    setTimeout(() => setStatus(newMsg.id, "inserted"), 400);
    setTimeout(() => remove(newMsg.id), deleteAfterDuration);
  }

  const Alert = alert(context);

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
          {(msg) => {
            const {
              component: { severity, message },
              status,
              id,
            } = msg;

            const AlertView = alertView(animations[status]);

            return (
              <AlertView onClick={() => remove(id)}>
                <Alert message={message} severity={severity} />
              </AlertView>
            );
          }}
        </For>
      </div>
    );
  };

  return { AlertStack, msgs, add };
};
