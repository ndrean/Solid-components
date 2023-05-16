import button from "../components/button";
import alertStack from "../components/alertStack";
import { BaseH1Props } from "../components/title";

const customCss2 = `
  border: none; 
  text-align: left;
  padding-left: 12px;
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, .2);
  `;

const Title = BaseH1Props();

export default (context) => {
  const { tr } = context;
  const Button = button(context);

  const { AlertStack, msgs, add } = alertStack(context);

  return (
    <section id="alert-stack">
      <Title css={customCss2}>{tr.t("Alert Stack")}</Title>
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
