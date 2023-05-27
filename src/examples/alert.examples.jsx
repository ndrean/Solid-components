import alert from "../components/alert";
import { dynTitle } from "../components/title";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
  } = context;
  const Alert = alert(context);
  const Title = dynTitle("h1", stdTitle);

  return () => (
    <section id="alert">
      <Title>{tr.t("Alert")}</Title>
      <Alert
        severity="error"
        name="Trouble Ahead"
        message={tr.t(
          "Error occured while trying to proxy to: localhost:8080/api/v1/me"
        )}
      />
      <Alert
        severity="warning"
        message={tr.t("Alert warning")}
        onRemove={(e) => {
          e.preventDefault();
          window.alert("removed");
        }}
      />
      <Alert
        severity="info"
        message={tr.t("Alert info message")}
        name="My Title"
        code="500"
      />
      <Alert
        severity="success"
        message={tr.t("Alert success message")}
        name="My Title"
        code="500"
      />
    </section>
  );
};
