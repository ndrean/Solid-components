import { createEffect, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import modal from "../components/modal";
import button from "../components/button";
import title from "../components/title";
import checkbox from "../components/checkbox";
import GrayDiv from "../components/GrayDiv";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
  } = context;

  const [modalOpen, setModalOpen] = createSignal(false);
  const toggleModal = () => setModalOpen((val) => !val);
  const Modal = modal(context);

  const Button = button(context);
  const Title = title(stdTitle);

  const CheckboxContainer = styled("div")`
    display: flex;
    align-items: center;
    label {
      margin-left: 1rem;
    }
  `;
  const Checkbox = checkbox(context);
  const [conditions, setConditions] = createSignal(false);

  const Content = () => (
    <div class="main">
      <CheckboxContainer>
        <Checkbox
          id="myModalCheckbox"
          name="myModalCheckbox"
          // value={conditions()}
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

  return (
    <section id="modal">
      <Title>{tr.t("Modal")}</Title>
      <p>
        The logic of this component is the same as the drawer. You toggle a
        state via a button, and pass it as a prop. The component is a child of
        an overlay div that covers the full screen with an opacity of 80%.
      </p>
      <p>
        You use a state <code> createSignal </code> to save the "terms of terms
        aggrement" checkbox state. If you place it inside the function
        component, then the state is NOT persisted through the app navigation.
        This is case here (the DIALOG example uses this).
      </p>
      <p>
        A MODAL is closed by clicking on an action button or by clicking outside
        of it (into the overlay).
      </p>
      <div style={{ "text-align": "center" }}>
        <Button ripple fullWidth onClick={toggleModal}>
          Check terms and conditions
        </Button>
      </div>
      <Modal open={modalOpen()} onClose={() => setModalOpen(false)}>
        <div class="header">My modal</div>
        <Content />
        <div class="footer">
          <Button
            onClick={() => {
              setConditions(false);
              setModalOpen(false);
            }}
          >
            {"\u274C"}
          </Button>
          <Button primary onClick={() => setModalOpen(false)}>
            {"\u2705"}
          </Button>
        </div>
      </Modal>
      <GrayDiv>
        <h5>
          {conditions() && "\u2705 I agreed with the terms and conditions"}
        </h5>
      </GrayDiv>
    </section>
  );
};
