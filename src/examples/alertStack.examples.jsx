import { css } from "solid-styled-components";
import button from "../components/button";
import alert from "../components/alert";

export default (context) => {
  const { alertStack } = context;

  const AlertStack = alertStack.View;
  const Button = button(context);
  const Alert = alert(context);

  return function () {
    return (
      <section id="alert-stack">
        <AlertStack />
        <h1>Alert Stack</h1>
        <Button
          raised
          onClick={() => {
            alertStack.add(
              <Alert severity="success" message={"Infrastructure Created"} />
            );
          }}
        >
          success alert
        </Button>
        <Button
          raised
          onClick={() => {
            alertStack.add(
              <Alert severity="info" message={"Something went wrong"} />
            );
          }}
        >
          Info alert
        </Button>
        <Button
          raised
          onClick={() => {
            alertStack.add(
              <Alert severity="warning" message={"Peggy went to the market"} />
            );
          }}
        >
          warning alert
        </Button>
        <Button
          raised
          onClick={() => {
            alertStack.add(
              <Alert severity="error" message={"Something went wrong"} />
            );
          }}
        >
          error alert
        </Button>
      </section>
    );
  };
};
