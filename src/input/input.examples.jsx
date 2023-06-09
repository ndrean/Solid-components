import { createSignal, createMemo, createEffect } from "solid-js";
import { styled } from "solid-styled-components";

import dialogComponent from "../dialog/dialogComponent";
import inputComponent from "./inputComponent";
import button from "../button/button";
import grayDiv from "../app/pages/grayDiv";
import submit from "../assets/submit.webp";
// import camera from "../assets/camera.svg";
import Unicode from "../typo/Unicode";

import Emoji from "../typo/Emoji";

export default (context) => {
  const InputComp = inputComponent(context);
  const GrayDiv = grayDiv(context);
  const Dialog = dialogComponent(context);

  const now = new Date().toISOString().split("T")[0];
  // define DOM refs
  let output, picInput, preview, previewer, formInputs;
  //  define custom state per input
  const [date, setDate] = createSignal(now);
  const [date2, setDate2] = createSignal(null);
  const [search, setSearch] = createSignal(null);
  const [search2, setSearch2] = createSignal(null);
  const [color, setColor] = createSignal("#887C6D");
  const [picture, setPicture] = createSignal(null);

  // shared state of the form for the submit button
  const [disabled, setDisabled] = createSignal(false);
  const [validations, setValidations] = createSignal({});

  // <-- constraints and validations
  const constraints = {
    date: isInvalidDate,
    date2: isInvalidDate,
    search2: isInvalidSearch,
  };

  function isInvalidSearch(data) {
    if (/\D{4,}/.test(data)) {
      return { msg: "", invalid: false };
    }
    return { msg: "min 4 letters, no number", invalid: true };
  }

  function isInvalidDate(data) {
    if (!data) return true;
    const now = new Date().toISOString().split("T")[0];
    if (data < now) {
      return { msg: "only futur dates", invalid: true };
    }
    return { msg: "", invalid: false };
  }
  // --> end of validations
  const computeLen = createMemo(() => Object.entries(constraints).length);
  function identity(t) {
    return t;
  }

  // <-- custom code for this page
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
    padding: "2em 1em 0em 1em",
    background: `linear-gradient(white, ${props.color})`,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // do something.... we print it out.
    formData.set("picture", formData.get("picture").name);
    output.value = JSON.stringify(Object.fromEntries(formData), null, "\t");
    formInputs.reset();
    setDate(now);
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
  // -->

  return (props) => {
    createEffect(() => {
      picInput.style.opacity = 0;
      picInput.style.width = 0;
      picInput.style.height = 0;
      picInput.style.margin = 0;
      picInput.style.padding = 0;
    });

    return (
      <section id="input.examples">
        <StylingDiv color={color()}>
          <p>
            These inputs are wrapped in a form. The SUBMIT is disabled only via
            the
            <code> required </code> prop on the 2 first inputs. You need to
            define signals for each input and code a validation function if
            needed.
          </p>
          <details>
            <summary>Validation function</summary>
            Code it and pass its reference into the "constraints" object. If
            there is no validation else than the browsers', then pass the
            identity function to the props <code> isInvalid </code>, (
            <code> t =&gt t </code>) and not in the "constraints" object. This
            is needed to keep the count of the total validations when you want
            to control the submit button.
          </details>
          <br />
          <form id="form-inputs" onSubmit={handleSubmit} ref={formInputs}>
            <fieldset>
              <legend>Inputs and Validations</legend>
              <br />
              <p>
                The input <Emoji label="🔎" size={25} mr={10} ml={10} /> is
                <code> REQUIRED </code>. The first has only browser validation
                (at least 4 letters, no number). No error message appears below,
                only the red border. The second has computed validation and the
                error appears below.
              </p>
              {/* <Emoji label="🔎" size={25} mr={20} /> */}
              <InputComp
                required
                autoocus
                id="search"
                type="search"
                label="Browser"
                entry={search()}
                setEntry={setSearch}
                pattern="\D{4,}"
                title="at least 4 letters, no numbers"
                nb={computeLen()}
                isInvalid={identity}
                setDisabled={setDisabled}
                validations={validations()}
                setValidations={setValidations}
              />
              <br />
              {/* <Emoji label="🔎" size={25} mr={20} /> */}
              <InputComp
                required
                autoocus
                id="search2"
                type="search"
                label="Computed"
                entry={search2()}
                setEntry={setSearch2}
                // pattern="\D{4,}"
                title="at least 4 letters, no numbers"
                nb={computeLen()}
                isInvalid={constraints["search2"]}
                setDisabled={setDisabled}
                validations={validations()}
                setValidations={setValidations}
              />

              <p>
                The input <Emoji label="🗓" size={25} ml={10} mr={10} />
                is <code> REQUIRED </code>. They have a computed validation and
                the default browser validation fo date type: when required and
                empty, a red border is set.
              </p>
              <Emoji label="🗓" size={25} mr={20} />
              <InputComp
                required
                id="date"
                type="date"
                label="default value"
                width={300}
                entry={date()}
                setEntry={setDate}
                nb={computeLen()}
                isInvalid={constraints["date"]}
                setDisabled={setDisabled}
                validations={validations()}
                setValidations={setValidations}
              />
              <br />
              <Emoji label="🗓" size={25} mr={20} />
              <InputComp
                required
                id="date2"
                type="date"
                label="no default"
                width={300}
                entry={date2()}
                setEntry={setDate}
                nb={computeLen()}
                isInvalid={constraints["date"]}
                setDisabled={setDisabled}
                validations={validations()}
                setValidations={setValidations}
              />

              <br />
              <p>
                None of these inputs below are required nor have validations.
              </p>
              <br />
              <CenteredDiv>
                <Emoji label="🎨" size={25} mr={20} mt={16} />
                <InputComp
                  id="color"
                  type="color"
                  value={color()}
                  height={5}
                  width={5}
                  setEntry={setColor}
                  nb={computeLen()}
                  isInvalid={identity}
                  setDisabled={setDisabled}
                  validations={validations()}
                  setValidations={setValidations}
                />
              </CenteredDiv>

              <br />
              <Label>
                <span>
                  <strong>Select:</strong>:
                </span>
                <Emoji label="📸" size={40} ml={20} />
                {/* <ImgSVG src={camera} alt="fileDownload" width={40} height={40} /> */}
                <InputComp
                  capture="user"
                  ref={picInput}
                  hidden
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
        <div style={{ "text-align": "center", "backgroud-color": "grey" }}>
          <input
            // disabled={disabled()}
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
};
