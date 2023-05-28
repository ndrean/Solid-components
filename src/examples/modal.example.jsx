import { createSignal, batch } from "solid-js";

import modal from "../components/modal";
import button from "../components/button";
import { dTitle } from "../components/title";
import grayDiv from "../components/grayDiv";
import Unicode from "../components/Unicode";
import ContentExample from "./ContentExample";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
    signals: { modalConditions },
    codes: { check, cross },
  } = context;

  const [conditions, setConditions] = createSignal(modalConditions);
  const [modalOpen, setModalOpen] = createSignal(false);

  const toggleModal = () => setModalOpen((val) => !val);
  const toggleConditions = () => setConditions((v) => !v);

  const Modal = modal(context);

  const Button = button(context);
  const Title = dTitle("h1", stdTitle);
  const GrayDiv = grayDiv(context);

  const saveContext = async () => {
    context.signals.modalConditions = conditions();
  };

  const reset = () =>
    batch(() => {
      setConditions(false);
      setModalOpen(false);
      saveContext();
    });

  return () => (
    <section id="modal">
      <Title>{tr.t("Modal")}</Title>
      <p>
        The logic of this component is the same as the drawer. You toggle a
        state via a button, and pass it as a prop. The component is a child of
        an overlay div that covers the full screen with an opacity of 80%.
      </p>
      <p>
        You use a state <code> createSignal </code> to save the "terms of terms
        aggrement" checkbox state placed in the modal. If you place it outisde
        of the function component, then the state is persisted through the app
        navigation.
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
      <Modal open={modalOpen()} onClose={reset}>
        <div class="header">My modal</div>
        <ContentExample
          conditions={conditions()}
          toggleConditions={() => toggleConditions()}
        />
        <div class="footer">
          <Button onClick={reset}>
            <Unicode size="1.5em" code={cross} />
          </Button>
          <Button
            primary
            onClick={() => {
              batch(() => {
                saveContext();
                setModalOpen(false);
              });
            }}
          >
            <Unicode size="1.5em" code={check} />
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
