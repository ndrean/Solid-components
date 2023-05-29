import { createSignal, createMemo, createEffect } from "solid-js";
import { styled } from "solid-styled-components";

import dialogComponent from "../dialog/dialogComponent";
import inputComponent from "./inputComponent";
// import imgSVG from "../typo/imgSVG";
import button from "../button/button";
import grayDiv from "../app/grayDiv";
import submit from "../assets/submit.webp";
// import camera from "../assets/camera.svg";
import Unicode from "../typo/Unicode";

import drawEmoji from "../typo/drawEmoji";

export default (context) => {
  const InputComp = inputComponent(context);
  const GrayDiv = grayDiv(context);
  const Emoji = drawEmoji(context);
  const Dialog = dialogComponent(context);

  // define DOM refs
  let output, picInput, preview, previewer, formInputs;
  //  define custom state per input
  const [date, setDate] = createSignal(null);
  const [search, setSearch] = createSignal(null);
  const [color, setColor] = createSignal("#887C6D");
  const [picture, setPicture] = createSignal(null);

  // shared state of the form for the submit button
  const [disabled, setDisabled] = createSignal(true);
  const [validations, setValidations] = createSignal({});

  // <-- constraints and validations
  const constraints = {
    date: (t) => isInvalidDate(t),
    search: (t) => isInvalidSearch(t),
  };

  function isInvalidSearch(data) {
    if (/\D{4,}/.test(data)) {
      return { msg: "", invalid: false };
    }
    return { msg: "min 4 letters, no number", invalid: true };
  }

  function isInvalidDate(data) {
    const now = new Date().toISOString().split("T")[0];
    if (data < now) {
      return { msg: "only futur dates", invalid: true };
    }
    return { msg: "", invalid: false };
  }
  // --> end of validations
  const computeLen = createMemo(() => Object.entries(constraints).length);
  const identity = (t) => t;

  // custom code for this page
  const Button = button(context);

  const PreviewerDialog = (props) => {
    return (
      <Dialog ref={previewer}>
        <img
          ref={preview}
          alt="preview"
          role="img"
          height={props.height || 200}
        />
        <Button type="submit" onClick={() => previewer.close()}>
          <Unicode size="2em" code={"\u274E"} />
        </Button>
      </Dialog>
    );
  };

  const Label = styled("label")`
    display: flex;
    align-items: center;
    label {
      margin-left: 1rem;
    }
  `;

  const CenteredDiv = styled("div")`
    display: flex;
  `;

  const StylingDiv = styled("div")((props) => ({
    padding: "2em",
    background: `linear-gradient(white, ${props.color})`,
  }));

  createEffect(() => {
    picInput.style.opacity = 0;
    picInput.style.width = 0;
    picInput.style.height = 0;
    picInput.style.margin = 0;
    picInput.style.padding = 0;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // do something.... we print it out.
    formData.set("picture", formData.get("picture").name);
    output.value = JSON.stringify(Object.fromEntries(formData), null, "\t");
    formInputs.reset();
  };

  const previewPic = ({ target: { files } }) => {
    if (files) {
      const src = URL.createObjectURL(files[0]);
      preview.style.display = "block";
      preview.src = src;
      previewer.showModal();
      URL.revokeObjectURL(preview.href);
    }
  };

  return () => (
    <section id="input.examples">
      <StylingDiv color={color()}>
        <form id="form-inputs" onSubmit={handleSubmit} ref={formInputs}>
          <fieldset>
            <legend>Inputs and Validations</legend>
            <br />
            <details>
              <summary>Details of double validation</summary>
              <p>
                An example of the same double validation: browser and component
                internal. The pattern is "at least 3 characters and no numbers".
                We set a pattern in the input and active the pseudo-class{" "}
                <code> :invalid </code> accordingly: this triggers the border to
                become red "onblur" when invalid and focused. If the input
                hasn't been focused, this validation isn't taken into account.
              </p>
              <p>
                On the other side, we add a validation function against the
                input and this disables or not the submit button and cn render
                an error message in the input cell. Code the validation
                function, pass it into the "constraints" object. The ErrorOuput
                cell comes from the input component. It displays the error
                message returned by the function.
              </p>
            </details>
            <br />
            <Emoji label="🔎" size={25} mr={20} />
            <InputComp
              required
              autoocus
              id="search"
              name="search"
              type="search"
              entry={search()}
              setEntry={setSearch}
              pattern="\D{4,}"
              title="at least 4 letters, no numbers"
              nb={computeLen()}
              isInvalid={constraints["search"]}
              setDisabled={setDisabled}
              validations={validations()}
              setValidations={setValidations}
            />
            <br />
            <details>
              <summary>
                Only component input validation: the prop{" "}
                <code> borderError</code>
              </summary>
              <p>
                An example with component validation but no browser validation.
                You implement a normal validation fonction (compared current
                date to selected date). The result disables or not the submit
                button and a message is sent to the ErrorOuput cell. To render
                the red border, we pass a prop{" "}
                <strong>
                  <code> borderError. </code>
                </strong>
              </p>
            </details>
            <br />
            <Emoji label="🗓" size={25} mr={20} />
            <InputComp
              name="date"
              id="date"
              type="date"
              width={300}
              borderError
              entry={date()}
              setEntry={setDate}
              nb={computeLen()}
              isInvalid={constraints["date"]}
              setDisabled={setDisabled}
              validations={validations()}
              setValidations={setValidations}
            />
            <br />
            <details>
              <summary>
                No validation: set prop{" "}
                <code>
                  isInvalid=\u007Bidentity\u007D and nothing in "constraints".
                </code>
              </summary>
              <p>
                When we don't use validations on inputs but are located in the
                same form, we set the props <code> isInvalid </code> to be the
                "identity" function (<code> t =&gt t </code>) and not in the
                "constraints" object. This is needed to keep the count of the
                total validations to enable the submit button.
              </p>
            </details>
            <br />
            <CenteredDiv>
              <Emoji label="🎨" size={25} mr={20} mt={16} />
              <label>
                <InputComp
                  height={5}
                  width={5}
                  name="color"
                  id="color"
                  type="color"
                  value={color()}
                  setEntry={setColor}
                  nb={computeLen()}
                  isInvalid={identity}
                  setDisabled={setDisabled}
                  validations={validations()}
                  setValidations={setValidations}
                />
              </label>
            </CenteredDiv>

            <br />
            <Label>
              <span>
                <strong>Select:</strong>:
              </span>
              <Emoji label="📸" size={30} ml={20} />
              {/* <ImgSVG src={camera} alt="fileDownload" width={40} height={40} /> */}
              <InputComp
                capture
                ref={picInput}
                hidden
                name="picture"
                id="picture"
                type="file"
                setEntry={setPicture}
                nb={computeLen()}
                isInvalid={identity}
                setDisabled={setDisabled}
                validations={validations()}
                setValidations={setValidations}
                accept="image/*"
                onInput={previewPic}
              />
            </Label>
          </fieldset>
        </form>
      </StylingDiv>
      <br />
      <div style={{ "text-align": "center" }}>
        <input
          disabled={disabled()}
          type="image"
          id="submit"
          form="form-inputs"
          src={submit}
          alt="submit button"
          height={80}
        />
      </div>

      <PreviewerDialog height={300} />
      <GrayDiv>
        <output ref={output}></output>
      </GrayDiv>
    </section>
  );
};
