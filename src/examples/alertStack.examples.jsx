import button from "../components/button";
import alertStack from "../components/alertStack";

export default (context) => {
  const { tr } = context;
  const Button = button(context);

  const { AlertStack, msgs, add } = alertStack(context);

  return (
    <section id="alert-stack">
      <h1>{tr.t("Alert Stack")}</h1>
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
