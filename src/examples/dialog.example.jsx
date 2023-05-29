import { createSignal, batch, onMount, onCleanup } from "solid-js";
import { styled } from "solid-styled-components";

import button from "../components/button";
import { dTitle } from "../components/utilities/title";
import dialogComponent, { resetIfOut } from "../components/dialogComponent.jsx";
import grayDiv from "../components/utilities/grayDiv";
import Unicode from "../components/typo/Unicode";
import { tickSVG } from "../components/typo/svgs";

import ContentExample from "./ContentExample";
import contentContainerExample from "./contentContainerExample";

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
  let diagPos, diagPos2, dialog;
  const [left, setLeft] = createSignal(10);
  const [top, setTop] = createSignal(60);

  const Dialog = dialogComponent(context)();

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

  //  close when click out of the box
  onMount(() => {
    dialog.addEventListener("click", (e) => {
      if (resetIfOut(e, dialog)) reset();
    });
  });
  onCleanup(() => removeEventListener("click", (e) => resetIfOut(e, dialog)));

  const Bold = styled("div")`
    font-weight: bold;
  `;

  return () => (
    <section id="dialog">
      <Title>{tr.t("Dialog")}</Title>
      <p>
        A <code>DIALOG MODAL </code> comes with a minimal CSS. It is opened as a
        MODAL with <code> showModal </code> and not with the attribute{" "}
        <code> open </code>. It is centered by default, with margin "auto".
      </p>

      <p>
        There is a checkbox on "terms of terms aggrement" in the dialog box. We
        put the state in the context to keep it global: it survives to
        navigation.
      </p>
      <p>
        A function <code>resetIfOut </code> is also exported: you can close the
        modal when you click outside of it (only in the first example below).
        You need to put a <code> ref </code> on the dialog component and set up
        listeners on the "click" event to enable this function. The listener is
        wrapped within a <code> onMount </code> (and <code> onCleanup </code>).
      </p>

      <div style={{ "text-align": "center" }}>
        <Button onClick={() => dialog.showModal()}>
          Check terms and conditions
        </Button>
      </div>
      <Dialog ref={dialog}>
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
      <Button fullWidth ripple onClick={() => diagPos.showModal()}>
        OPEN A POSTIONNABLE DIALOG BOX
      </Button>
      <Dialog ref={diagPos} left={left()} top={top()}>
        <Bold>
          <h1>Hello from Dailog!</h1>
          <Button fullWidth ripple onClick={() => diagPos.close()}>
            <TickSVG size={60} />
          </Button>
        </Bold>
      </Dialog>
      <br />
      <Button fullWidth ripple onClick={() => diagPos2.showModal()}>
        OPEN A DEFAULT CENTERED DIALOG BOX
      </Button>
      <Dialog ref={diagPos2} id="diagPos2">
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
