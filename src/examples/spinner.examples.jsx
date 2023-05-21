import spinRect from "../components/spinRect";
import spinCircle from "../components/spinCircle";

export default (context) => {
  const { tr } = context;
  const SpinRect = spinRect(context);
  const SpinCircle = spinCircle(context);
  return function SpinnerExamples() {
    return (
      <div>
        <h3>{tr.t("Spinners")}</h3>

        <SpinRect />
        <SpinRect size={60} />
        <SpinRect size={90} color="blue" />
        <SpinRect size={120} color="red" />
        <br />
        <SpinCircle />
      </div>
    );
  };
};
