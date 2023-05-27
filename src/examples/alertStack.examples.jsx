import { css } from "solid-styled-components";
import button from "../components/button";
import alertStack from "../components/alertStack";
import { dynTitle } from "../components/title";

const vert = css`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;
export default (context) => {
  const {
    tr,
    classes: { stdContainer, stdTitle },
  } = context;
  const Button = button(context);
  const Title = dynTitle("h1", stdTitle);

  const { AlertStack, msgs, add } = alertStack(context);

  return () => (
    <section
      id="alert-stack"
      class={css`
        ${stdContainer}
      `}
    >
      <Title css={stdTitle}>{tr.t("Alert Stack")}</Title>
      <div class={vert}>
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
      </div>
      <AlertStack messages={msgs} />
    </section>
  );
};
