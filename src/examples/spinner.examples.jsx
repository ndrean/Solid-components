import spinRect from "../components/spinRect";
import spinCircle from "../components/spinCircle";
import title from "../components/title";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
  } = context;
  const SpinRect = spinRect(context);
  const SpinCircle = spinCircle(context);
  const Title = title(stdTitle);
  return function SpinnerExamples() {
    return (
      <div>
        <Title>{tr.t("Spinners")}</Title>
        <p>
          You can set the prop <code>invisible </code> to hide the spinner
        </p>

        <SpinRect />
        <SpinRect invisible />
        <SpinRect size={60} />
        <SpinRect size={90} color="midnightblue" />
        <SpinRect size={120} color="bisque" />
        <br />
        <SpinCircle />
        <SpinCircle size={100} invisible />
        <SpinCircle size={100} />
      </div>
    );
  };
};
