import button from "../components/button";
import alertStack from "../components/alertStack";
import { tClass } from "../components/title";
import { createUniqueId } from "solid-js";

// const customCss2 = `
//   border: none;
//   text-align: left;
//   padding-left: 12px;
//   box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, .2);
//   `;

export default (context) => {
  const { tr, customCss } = context;
  const Button = button(context);
  const Title = tClass(customCss);

  const { AlertStack, msgs, add } = alertStack(context);

  return (
    <section id="alert-stack">
      <Title css={customCss}>{tr.t("Alert Stack")}</Title>
      <Button
        ripple
        onClick={() =>
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
      <AlertStack messages={msgs} />
    </section>
  );
};
