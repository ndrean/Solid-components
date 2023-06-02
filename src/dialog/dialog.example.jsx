import { createSignal, batch, onMount, onCleanup } from "solid-js";
import { styled } from "solid-styled-components";

import dialogComponent from "./dialogComponent.jsx";
import button from "../button/button";
import { dTitle } from "../app/pages/title.jsx";
import grayDiv from "../app/pages/grayDiv.jsx";
import Unicode from "../typo/Unicode";
import { tickSVG } from "../typo/svgs";

import ContentExample from "./ContentExample";
import contentContainerExample from "../modal/contentContainerExample";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
    signals: { dialogConditions },
    codes: { cross, check },
  } = context;

  const [conditions, setConditions] = createSignal(dialogConditions);
  const Button = button(context);
  const Title = dTitle("h1", stdTitle);
  const H3 = dTitle("h3");
  const H4 = dTitle("h4");
  const GrayDiv = grayDiv(context);
  const TickSVG = tickSVG(context);

  const ContentContainerExample = contentContainerExample(context);

  const toggleConditions = () => setConditions((v) => !v);

  const saveContext = async () => {
    context.signals.dialogConditions = conditions();
  };

  // refs to DOM dialogs refs
  let diagPos1, diagPos2, dialog;
  const [left, setLeft] = createSignal(10);
  const [top, setTop] = createSignal(60);

  const Dialog = dialogComponent(context);

  const reset = () => {
    batch(() => {
      setConditions(false);
      saveContext();
      dialog.close();
    });
  };

  const save = (e) => {
    e.preventDefault();
    batch(() => {
      saveContext();
      dialog.close();
    });
  };

  const Bold = styled("div")`
    font-weight: bold;
  `;

  return (props) => {
    //  close when click out of the box
    // onMount(() =>
    //   dialog.addEventListener("click", (e) => {
    //     if (clickOut(e, dialog)) reset();
    //   })
    // );
    // onCleanup(() => removeEventListener("click", (e) => clickOut(e, dialog)));

    return (
      <section id="dialog">
        <Title>{tr.t("Dialog")}</Title>
        <p>
          A <code>DIALOG MODAL </code> comes with a minimal CSS. It is opened as
          a MODAL with <code> showModal </code> and not with the attribute{" "}
          <code> open </code>. It is centered by default, with margin "auto".
        </p>
        <p>
          If you want to extend the style, pass a CSS-in-JS (with ticks `) to
          the prop <code> optCSS.</code>
        </p>
        <p>
          The Dialog/Modal component needs a <code> ref </code> attribute and an{" "}
          <code> ID </code> attribute. You interact with the Dialog via the REF
          (showModal, close). You enable "clickOut" via the ID.
        </p>

        <div style={{ "text-align": "center" }}>
          <Button onClick={() => dialog.showModal()}>
            Check terms and conditions
          </Button>
        </div>
        <Dialog ref={dialog} id="d1">
          {/* This container defines the classes that apply to "main", "header", "footer" */}
          <ContentContainerExample>
            <div class="header">My dialog</div>
            <ContentExample
              conditions={conditions()}
              toggleConditions={() => toggleConditions()}
            />
            <div class="footer">
              <Button onClick={reset} autofocus>
                <Unicode size="1.5em" code={cross} />
              </Button>
              <Button onClick={save}>
                <Unicode size="1.5em" code={check} />
              </Button>
            </div>
          </ContentContainerExample>
        </Dialog>
        <br />
        <GrayDiv>
          <h5>
            {conditions() && "\u2705 I agreed with the terms and conditions"}
          </h5>
        </GrayDiv>
        <H3>
          An example of a repositionable <code> DIALOG MODAL</code>.
        </H3>
        <p>
          You can also design a positionned DIALOG modal by setting the props{" "}
          <code> left </code> and <code> top </code> which correspond to the
          margins.
        </p>

        <input
          type="range"
          value={left()}
          min={0}
          max={200}
          onInput={(e) => setLeft(e.target.value)}
        />
        <span>&nbsp {left()}</span>
        <input
          type="range"
          value={top()}
          min={60}
          max={200}
          onInput={(e) => setTop(e.target.value)}
        />
        <span>&nbsp {top()}</span>
        <p>
          Change the slider above and check the position of the Dailog modal. It
          defaults to centered modal (with margin "auto").
        </p>
        <br />
        <Button fullWidth ripple onClick={() => diagPos1.showModal()}>
          OPEN A POSTIONNABLE DIALOG BOX
        </Button>
        <Dialog ref={diagPos1} left={left()} top={top()} id="d2">
          <Bold>
            <h1>Hello from Dailog!</h1>
            <Button fullWidth ripple onClick={() => diagPos1.close()}>
              <TickSVG size={60} />
            </Button>
          </Bold>
        </Dialog>
        <br />
        <Button fullWidth ripple onClick={() => diagPos2.showModal()}>
          OPEN A DEFAULT CENTERED DIALOG BOX
        </Button>
        <Dialog ref={diagPos2} id="d3">
          <Bold>
            <h1>Centered Dailog!</h1>
            <Button fullWidth ripple onClick={() => diagPos2.close()}>
              <TickSVG size={60} />
            </Button>
          </Bold>
        </Dialog>
      </section>
    );
  };
};
