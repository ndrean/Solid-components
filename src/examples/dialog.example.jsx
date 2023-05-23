import { createSignal, batch } from "solid-js";

import button from "../components/button";
import title from "../components/title";
import dialogComponent from "../components/dialogComponent.jsx";
import checkbox from "../components/checkbox";
import grayDiv from "../components/grayDiv";
import CheckboxContainer from "../components/CheckboxContainer";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
    signals: { dialogConditions },
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

  const [dialogOpen, setDialogOpen] = createSignal(false);

  const toggleDiag = () => setDialogOpen((v) => !v);

  const closeDialog = (e) => {
    const type = e.target.dataset.type;
    if (type === "cancel") {
      return reset();
    }
    if (type === "ok") {
      batch(() => {
        setDialogOpen(false);
        saveContext();
      });
    }
  };

  const reset = () =>
    batch(() => {
      setConditions(false);
      setDialogOpen(false);
      saveContext();
    });

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

  return (
    <section id="dialog">
      <Title>{tr.t("Dialog")}</Title>
      <p>
        You use a state <code> createSignal </code> to save the "terms of terms
        aggrement" checkbox state placed in the dialog box. If you place it
        outisde of the function component, then the state is persisted through
        the app navigation.
      </p>
      <p>
        By default, a DIALOG is closed by clicking on it, not outisde as in a
        MODAL. You can decide where the user can click in the dialog box to
        close the box. For example, we have a checkbox inside the box so we
        capture the "onClick" and forbid the box to close when you target the
        checkbox zone.
      </p>

      <div style={{ "text-align": "center" }}>
        <Button ripple onClick={toggleDiag}>
          Check terms and conditions
        </Button>
      </div>
      <Dialog open={dialogOpen()} onClick={closeDialog}>
        <div class="header">My dialog</div>
        <Content />
        <div class="footer">
          <Button onClick={reset} data-type="cancel">
            {"\u274C"}
          </Button>
          <Button primary data-type="ok" onClick={() => setDialogOpen(false)}>
            {"\u2705"}
          </Button>
        </div>
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
