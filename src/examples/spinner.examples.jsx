import {
  loadingMsg,
  spinCirclePart,
  charging,
  classic,
  arrow,
  spinRect,
  spinCircle,
} from "../components/loaders";
import { dTitle } from "../components/title";
import progressBar from "../components/progressBar";
import { createEffect, createSignal } from "solid-js";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
  } = context;
  const SpinRect = spinRect(context);
  const SpinCircle = spinCircle(context);
  const Title = dTitle("h1", stdTitle);
  const SpinCirclePart = spinCirclePart(context);
  const LoadingMsg = loadingMsg("30px");
  const Charging = charging("40px", "15px");
  const Classic = classic(context);
  const Arrow = arrow(context);

  const Prog = progressBar({ max: 500 });

  const [invisible, setInVisible] = createSignal(true);
  setInterval(() => setInVisible((v) => !v), 1000);

  return function SpinnerExamples() {
    return (
      <section id="spinner.examples">
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
        {/* <Prog width={"100%"} height={"40px"} /> */}

        <p>
          Spinners: you can adjust the <code> size </code> and{" "}
          <code> color </code>props and set the prop <code>invisible </code> to
          hide the spinners below:
        </p>
        <p>\u003C SpinRect /\u003E </p>
        <SpinRect />
        <p>
          Visibility is toggled every second: \u003C SpinRect
          invisible=\u007Binvisible()\u007D/\u003E
        </p>
        <SpinRect invisible={invisible()} color="midnightblue" />
        <p>\u003C SpinRect size=\u007B60\u007D /\u003E </p>
        <SpinRect size={60} />
        <p>\u003C SpinRect size=\u007B120\u007D color="bisque" /\u003E</p>
        <SpinRect size={120} color="bisque" />
        <p>Some examples with keyframes</p>

        <p>
          \u003C Arrow width=\u007B100\u007D height=\u007B30\u007D
          color="midnightblue" /\u003E{" "}
        </p>
        <Arrow />

        <p>
          \u003C SpinCirclePart size=\u007B8\u007D color1="midnightblue"
          color2="bisque" / \u003E <br />
          \u003C SpinCirclePart size=\u007B8\u007D color2="midnightblue"
          color1="bisque" / \u003E
        </p>
        <div style={{ display: "flex" }}>
          <SpinCirclePart size={48} color1="midnightblue" color2="bisque" />
          <SpinCirclePart size={48} color2="midnightblue" color1="bisque" />
        </div>
        <p>
          \u003C Classic size=\u007B50\u007D color1="midnightblue"
          color2="bisque" /\u003E
        </p>
        <Classic size={50} color1="midnightblue" color2="bisque" />
        <p>\u003C LoadingMsg msg="working..." size=\u007B20\u007D /\u003E</p>
        <LoadingMsg size={20} msg="working for....">
          you!
        </LoadingMsg>
        <p>
          \u003C Charging color="green" width=\u007B50\u007D
          height=\u007B15\u007D /\u003E
        </p>
        <Charging color="green" />
        <p>
          You can adjust the <code> size </code> and <code> duration </code> and
          set the prop <code>invisible </code> to hide the spinners below:
        </p>
        <p>
          \u003C SpinCircle size=\u007B default is "200" \u007D duration=\u007B
          default is 1300ms\u007D/\u003E
        </p>
        <SpinCircle />
        <p>
          Visibilty is toggled every second: \u003C SpinCircle
          size=\u007B20\u007D invisible=\u007Binvisible()\u007D /\u003E
        </p>
        <SpinCircle size={30} invisible={invisible()} />
        <p>
          \u003C SpinCircle size=\u007B100\u007D duration=\u007B500\u007D
          /\u003E
        </p>

        <SpinCircle size={100} duration={500} />
      </section>
    );
  };
};
