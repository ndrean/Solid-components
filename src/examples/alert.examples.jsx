import alert from "../components/alert";

export default (context) => {
  const { tr } = context;
  const Alert = alert(context);
  return function AlertExamples() {
    return (
      <section id="alert">
        <h3>{tr.t("Alert")}</h3>
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
};
