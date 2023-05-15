import button from "../components/button";
import alertStack from "../components/alertStack";
// import alert from "../components/alert";

export default (context) => {
  const { tr } = context;
  const Button = button(context);

  const { AlertStack, msgs, add } = alertStack(context);
  // const Alert = alert(context);

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
      {/* <p>{JSON.stringify(msgs)}</p> */}
      <AlertStack messages={msgs} />
    </section>
  );
};
