import { createSignal } from "solid-js";
import spinRect from "../components/spinRect";
import spinCircle from "../components/spinCircle";
import title from "../components/title";
import progressBar from "../components/progressBar";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
  } = context;
  const SpinRect = spinRect(context);
  const SpinCircle = spinCircle(context);
  const Title = title(stdTitle);

  const Prog = progressBar({ max: 500 });

  return function SpinnerExamples() {
    return (
      <div>
        <Title>{tr.t("Spinners")}</Title>
        <p>
          Progress bar: you can adjust the <code> width </code> and{" "}
          <code> height </code> props, and modify the <code> max </code>{" "}
          argument.
        </p>
        <p>
          <code>const Prog = progressBar(\u007Bmax: 500\u007D)</code>
          <br />
          <code>
            &ltProg width=\u007B"100%"\u007D height=\u007B"40px"\u007D/&gt
          </code>
        </p>
        <Prog width={"100%"} height={"40px"} />

        <p>
          Spinners: you can adjust the <code> size </code> and{" "}
          <code> color </code>props and set the prop <code>invisible </code> to
          hide the spinners below:
        </p>
        <p>
          <SpinRect />
          <SpinRect invisible />
          <SpinRect size={60} />
          <SpinRect size={90} color="midnightblue" />
          <SpinRect size={120} color="bisque" />
        </p>
        <p>
          You can adjust the <code> size </code> and <code> duration </code> and
          set the prop <code>invisible </code> to hide the spinners below:
        </p>
        <p>
          <SpinCircle />
          <SpinCircle size={100} invisible />
          <SpinCircle size={100} duration={"500ms"} />
        </p>
      </div>
    );
  };
};
