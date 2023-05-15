import { createSignal } from "solid-js";

import button from "../components/button";
import alertStack from "../components/alertStack";
import alert from "../components/alert";

const deleteAfterDuration = 8e3;

export default (context) => {
  const { tr, limit } = context;
  const Button = button(context);

  const [messages, setMessages] = createSignal([]);

  const AlertStack = alertStack(context);
  const Alert = alert(context);

  function setStatus(id, status) {
    const updatedMessages = messages().map((message) => {
      if (message.id === id) {
        return { ...message, status: status };
      }
      return message;
    });
    setMessages(updatedMessages);
  }

  function remove(id) {
    console.log("remove", id);
    setStatus(id, "removing");
    const updatedMessages = messages().filter((message) => message.id !== id);
    setMessages(updatedMessages);
  }

  function add(component) {
    const message = {
      id: Math.random().toString(10).split(".")[1],
      component,
      status: "inserting",
    };
    console.log("add", message.id);

    if (messages().length >= limit) {
      const [f, ...rest] = messages();
      remove(f.id);
    }

    setMessages((messages) => [...messages, message]);
    setTimeout(() => setStatus(message.id, "inserted"), 400);
    setTimeout(() => remove(message.id), deleteAfterDuration);
  }

  return (
    <section id="alert-stack">
      <h1>{tr.t("Alert Stack")}</h1>
      <Button
        ripple
        onClick={() =>
          // add(<Alert severity="success" message="Infrastructure Created" />)
          add({ severity: "success", message: "Infrastructure Created" })
        }
      >
        success alert
      </Button>
      <Button
        ripple
        onClick={() =>
          add({ severity: "info", message: "Something went wrong" })
        }
      >
        Info alert
      </Button>
      <Button
        ripple
        onClick={() =>
          add({ severity: "warning", message: "Peggy went to the market" })
        }
      >
        warning alert
      </Button>
      <Button
        ripple
        onClick={() =>
          add({ severity: "error", message: "Something went wrong" })
        }
      >
        error alert
      </Button>
      <AlertStack messages={messages()} />
    </section>
  );
};
