import {
  createSignal,
  batch,
  //   createEffect,
  onMount,
  onCleanup,
} from "solid-js";

import button from "../components/button";
import title from "../components/title";
import dialogComponent from "../components/dialogComponent.jsx";
import checkbox from "../components/checkbox";
import grayDiv from "../components/grayDiv";
import CheckboxContainer from "../components/CheckboxContainer";
import Unicode from "../components/Unicode";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
    signals: { dialogConditions },
    codes: { cross, check },
  } = context;

  const [conditions, setConditions] = createSignal(dialogConditions);
  const Checkbox = checkbox(context);
  const Button = button(context);
  const Title = title(stdTitle);
  const Dialog = dialogComponent(context);
  const GrayDiv = grayDiv(context);

  const toggleConditions = () => setConditions((v) => !v);

  const saveContext = async () => {
    context.signals.dialogConditions = conditions();
  };

  const Content = () => (
    <div class="main">
      <CheckboxContainer>
        <Checkbox
          id="myDialogCheckboxID"
          name="myDialogCheckbox"
          value="accepted"
          checked={conditions()}
          onInput={toggleConditions}
        />
        <label for="myDialogCheckboxID">
          I agree with the terms and conditions
        </label>
      </CheckboxContainer>
      <p>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
        laying out print, graphic or web designs. The passage is attributed to
        an unknown typesetter in the 15th century who is thought to have
        scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a
        type specimen book. It usually begins with: “Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua.” The purpose of lorem ipsum is to create a
        natural looking block of text (sentence, paragraph, page, etc.) that
        doesn't distract from the layout. A practice not without controversy,
        laying out pages with meaningless filler text can be very useful when
        the focus is meant to be on design, not content. The passage experienced
        a surge in popularity during the 1960s when Letraset used it on their
        dry-transfer sheets, and again during the 90s as desktop publishers
        bundled the text with their software. Today it's seen all around the
        web; on templates, websites, and stock designs.
      </p>
    </div>
  );

  let myDialog;

  const reset = () => {
    batch(() => {
      setConditions(false);
      saveContext();
      myDialog.close();
    });
  };

  const resetIfOut = (e) => {
    const { left, right, bottom, top } = myDialog.getBoundingClientRect();
    if (
      e.clientX < left ||
      e.clientX > right ||
      e.clientY < top ||
      e.clientY > bottom
    ) {
      reset();
    }
  };

  onMount(() => myDialog.addEventListener("click", resetIfOut));
  onCleanup(() => myDialog.addEventListener("click", resetIfOut));
  //   createEffect(() =>removeEventListener("click", resetIfOut));

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
        By default, a DIALOG is closed by clicking on it, not outisde as in a
        MODAL. We added a function to localise click events and close when
        clicked outside of it.
      </p>

      <div style={{ "text-align": "center" }}>
        <Button ripple onClick={() => myDialog.showModal()}>
          Check terms and conditions
        </Button>
      </div>
      <Dialog ref={myDialog}>
        <div class="header">My dialog</div>
        <Content />
        <div class="footer">
          <Button onClick={reset} data-type="cancel">
            <Unicode size="1.5em" code={cross} />
          </Button>
          <Button
            onClick={() =>
              batch(() => {
                saveContext();
                myDialog.close();
              })
            }
          >
            <Unicode size="1.5em" code={check} />
          </Button>
        </div>
      </Dialog>
      <br />
      <GrayDiv>
        <h5>
          {/* {conditions() && "\u2705 I agreed with the terms and conditions"} */}
          {conditions() && "\u2705 I agreed with the terms and conditions"}
        </h5>
      </GrayDiv>
    </section>
  );
};
