import { createSignal, onMount, onCleanup, createEffect } from "solid-js";
import { styled } from "solid-styled-components";

import button from "../components/button";
import title from "../components/title";
import mydialog from "../components/mydialog.jsx";
import checkbox from "../components/checkbox";
import GrayDiv from "../components/GrayDiv";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
  } = context;

  const CheckboxContainer = styled("div")`
    display: flex;
    align-items: center;
    label {
      margin-left: 1rem;
    }
  `;
  const Checkbox = checkbox(context);
  const Button = button(context);
  const Title = title(stdTitle);
  const Dialog = mydialog(context);
  const [conditions, setConditions] = createSignal(false);

  const Content = () => (
    <div class="main">
      <CheckboxContainer>
        <Checkbox
          id="myModalCheckbox"
          name="myCheckbox"
          value={conditions()}
          checked={conditions()}
          onChange={() => setConditions((v) => !v)}
        ></Checkbox>
        <label for="myModalCheckbox">
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

  const [openDialog, setOpenDialog] = createSignal(false);

  const toggleConditions = () => setConditions((v) => !v);
  const closeDialog = () => setOpenDialog(false);

  const close = (e) => {
    const targetIsConditions =
      e.target.tagName === "LABEL" || e.target.tagName === "INPUT";
    if (targetIsConditions) {
      toggleConditions();
    } else {
      closeDialog();
    }
  };

  return (
    <section id="dialog">
      <Title>{tr.t("Dialog")}</Title>
      <div style={{ "text-align": "center" }}>
        <Button onClick={() => setOpenDialog((v) => !v)}>Toggle Dialog</Button>
      </div>
      <Dialog id="mydialog" open={openDialog()} onClick={close}>
        <div class="header">My dialog</div>
        <Content />
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
