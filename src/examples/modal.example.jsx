import { createSignal, For, createEffect } from "solid-js";
import modal from "../components/modal";
import button from "../components/button";
import title from "../components/title";

export default (context) => {
  const { tr } = context;

  const [modalOpen, setModalOpen] = createSignal(false);

  const toggleModal = () => setModalOpen((val) => !val);

  const Modal = modal(context);
  const Button = button(context);
  const Title = title(context);

  const Content = () => (
    <div class="main">
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
      laying out print, graphic or web designs. The passage is attributed to an
      unknown typesetter in the 15th century who is thought to have scrambled
      parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen
      book. It usually begins with: “Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.” The purpose of lorem ipsum is to create a natural looking
      block of text (sentence, paragraph, page, etc.) that doesn't distract from
      the layout. A practice not without controversy, laying out pages with
      meaningless filler text can be very useful when the focus is meant to be
      on design, not content. The passage experienced a surge in popularity
      during the 1960s when Letraset used it on their dry-transfer sheets, and
      again during the 90s as desktop publishers bundled the text with their
      software. Today it's seen all around the web; on templates, websites, and
      stock designs.
    </div>
  );

  return (
    <section id="modal">
      <Title>{tr.t("Modal")}</Title>
      <Button onClick={toggleModal}>OPEN MODAL</Button>
      <Modal open={modalOpen()} onClose={() => setModalOpen(false)}>
        <div class="header">My modal</div>
        <Content />
        <div class="footer">
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button primary onClick={() => setModalOpen(false)}>
            OK
          </Button>
        </div>
      </Modal>
    </section>
  );
};
