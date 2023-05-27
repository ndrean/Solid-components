import { createSignal, batch, onMount, onCleanup } from "solid-js";
import { styled } from "solid-styled-components";

import button from "../components/button";
import { dynTitle } from "../components/title";
import dialogComponent from "../components/dialogComponent.jsx";
import grayDiv from "../components/grayDiv";
import Unicode from "../components/Unicode";
import { tickSVG } from "../components/svgs";

import ContentExample from "./ContentExample";
import contentContainerExample from "./contentContainerExample";
import { dialogPositionned, resetIfOut } from "../components/dialogPositioned";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
    signals: { dialogConditions },
    codes: { cross, check },
  } = context;

  const [conditions, setConditions] = createSignal(dialogConditions);
  const Button = button(context);
  const Title = dynTitle("h1", stdTitle);
  const H4 = dynTitle("h4");
  const GrayDiv = grayDiv(context);
  const TickSVG = tickSVG(context);

  const ContentContainerExample = contentContainerExample(context);

  const toggleConditions = () => setConditions((v) => !v);

  const saveContext = async () => {
    context.signals.dialogConditions = conditions();
  };

  let diagPos, diagPos2;
  const DialogPos = dialogPositionned(context);
  const [left, setLeft] = createSignal(0);

  let dialog;
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

  /*
     close when click out of the box
  const resetIfOut = (e) => {
    const { left, right, bottom, top } = dialog.getBoundingClientRect();
    //to understand what is left, right...and the constraints, just check the picture
    //at https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect
    if (
      e.clientX < left ||
      e.clientX > right ||
      e.clientY < top ||
      e.clientY > bottom
    ) {
      reset();
    }
  };
  */

  onMount(() => {
    dialog.addEventListener("click", (e) => resetIfOut(e, dialog));
  });
  onCleanup(() => removeEventListener("click", (e) => resetIfOut(e, dialog)));

  const Bold = styled("div")`
    font-weight: bold;
  `;

  return (
    <section id="dialog">
      <Title>{tr.t("Dialog")}</Title>
      <p>
        An example of a repositionable <code> DIALOG MODAL </code>. We set the
        props <code> left </code>
        and <code> top </code>.{" "}
      </p>
      <input
        type="range"
        value={left()}
        min={0}
        max={300}
        onInput={(e) => setLeft(e.target.value)}
      />
      <span>&nbsp {left()}</span>
      <p>
        Change the slider above and check the position of the Dailog modal. It
        defaults to centered modal (with margin "auto").
      </p>
      <br />
      <Button fullWidth ripple onClick={() => diagPos.showModal()}>
        OPEN A POSTIONNABLE DIALOG BOX
      </Button>
      {/* <DialogPos ref={diagDrawer} top={60} left={left()}> */}
      <DialogPos ref={diagPos} left={left()} top={60}>
        <Bold>
          <h1>Hello from Dailog!</h1>
          <Button fullWidth ripple onClick={() => diagPos.close()}>
            <TickSVG size={60} />
          </Button>
        </Bold>
      </DialogPos>
      <br />
      <Button fullWidth ripple onClick={() => diagPos2.showModal()}>
        OPEN A DEFAULT CENTERED DIALOG BOX
      </Button>
      <DialogPos ref={diagPos2} id="diagPos2">
        <Bold>
          <h1>Centered Dailog!</h1>
          {/* <form method="diagPos2">  <-- if form submitted*/}
          <Button fullWidth ripple onClick={() => diagPos2.close()}>
            <TickSVG size={60} />
          </Button>
          {/* </form> */}
        </Bold>
      </DialogPos>

      <p>
        The DIALOG is opened with "showModal", not with the attribute "open".
        This gives easy centering and control on how to handle its closure.
      </p>
      <p>
        You use a state <code> createSignal </code> to save the "terms of terms
        aggrement" checkbox state placed in the dialog box. We put the state it
        instead in the context os it is global. The autofocus is put on the
        cancel button. There is also a function to close it when clicked outside
        of it in the example below.
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
    </section>
  );
};
