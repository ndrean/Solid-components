import { createSignal, batch, onMount, onCleanup } from "solid-js";

import button from "../components/button";
import { dynTitle } from "../components/title";
import dialogComponent from "../components/dialogComponent.jsx";
import grayDiv from "../components/grayDiv";
import Unicode from "../components/Unicode";
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
  const Title = dynTitle(stdTitle, "h1");
  const Dialog = dialogComponent(context);
  const GrayDiv = grayDiv(context);
  const ContentContainerExample = contentContainerExample(context);

  const toggleConditions = () => setConditions((v) => !v);

  const saveContext = async () => {
    context.signals.dialogConditions = conditions();
  };

  let dialog;

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

  //   close when click out of the box
  const resetIfOut = (e) => {
    const { left, right, bottom, top } = dialog.getBoundingClientRect();
    /* to understand what is left, right...and the constraints, just check the picture
    at https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect
    */
    if (
      e.clientX < left ||
      e.clientX > right ||
      e.clientY < top ||
      e.clientY > bottom
    ) {
      reset();
    }
  };

  onMount(() => dialog.addEventListener("click", resetIfOut));
  onCleanup(() => dialog.removeEventListener("click", resetIfOut));

  return (
    <section id="dialog">
      <Title>{tr.t("Dialog")}</Title>
      <p>
        You use a state <code> createSignal </code> to save the "terms of terms
        aggrement" checkbox state placed in the dialog box. You can place the
        state outside of the function component to make it global. We put it
        instead in the context.
      </p>
      <p>
        The DIALOG is opened with "showModal", not with the attribute "open".
        This gives easy centering and control on how to handle its closure.
        There is a function to close it when clicked outside of it.
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
            <Button onClick={reset}>
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
