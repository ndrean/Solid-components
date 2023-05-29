import { createSignal, createMemo, createEffect } from "solid-js";
import { styled } from "solid-styled-components";

import dialogComponent from "../components/dialogComponent";
import inputComponent from "../components/inputComponent";
import imgSVG from "../components/typo/imgSVG";
import button from "../components/button";
import grayDiv from "../components/utilities/grayDiv";
import submit from "../assets/submit.webp";
import camera from "../assets/camera.svg";
import Unicode from "../components/typo/Unicode";

import drawEmoji from "../components/typo/drawEmoji";

export default (context) => {
  const InputComp = inputComponent(context);
  const GrayDiv = grayDiv(context);
  const Emoji = drawEmoji(context);
  const Dialog = dialogComponent(context);

  // define DOM refs
  let output, picInput, preview, previewer, formInputs, dateError;
  //  define custom state per input
  const [date, setDate] = createSignal(null);
  const [search, setSearch] = createSignal(null);
  const [number, setNumber] = createSignal(null);
  const [tel, setTel] = createSignal(null);
  const [color, setColor] = createSignal("#7580d7");
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
    if (/\D{3,}/.test(data)) {
      return { msg: "", invalid: false };
    }
    return { msg: "min 3 letters, no number", invalid: true };
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

  const identity = (t) => t;

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
            <legend>A collection of inputs</legend>
            <p>
              An example of a double validation: browser and component internal.
              We set a pattern and active the pseudo-class{" "}
              <code> :invalid </code> accordingly: this triggers the border to
              become red "onblur" when invalid and focused. If the input hasn't
              been focused, this validation isn't taken into account.
            </p>
            <p>
              On the other side, we add a validation function against the input
              and this renders an error message in the input cell. The
              ErrorOuput cell is already coded with the input.
            </p>
            <details>
              <summary>Implementation details</summary>
              <p>
                To implement the browser validation, put the desired regex in
                the pattern props. The input component has already the CSS
                implemented.
              </p>
              <p>
                For the component internals, code the validation function, pass
                it into the "constraints" object. validation only (at least 3
                letters). You need to code the corresponding validation function
                and use an ErrorOutput box to display the error message returned
                by the function.
              </p>
            </details>
            <br />
            <Emoji label="🔎" size={25} mr={20} />
            <InputComp
              required
              autofocus
              id="search"
              name="search"
              type="search"
              entry={search()}
              pattern="\D{3,}"
              title="at least 3 letters, no numbers"
              setEntry={setSearch}
              nb={computeLen()}
              isInvalid={constraints["search"]}
              setDisabled={setDisabled}
              validations={validations()}
              setValidations={setValidations}
            />
            <br />
            <p>
              An example with validation on futur dates The browser opens a
              calender and you implement a validation fontion (compared current
              date to selected date). The result disables or not the submit
              button and a message is sent to the ErrorOuput cell.
            </p>
            <Emoji label="🗓" size={25} mr={20} />
            <InputComp
              name="date"
              id="date"
              type="date"
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
            <p>
              We don't use validations on this input. We set the props{" "}
              <code> isInvalid </code>
              to the "identity" function (<code> t =&gt t </code>).
            </p>
            <Emoji label="🧮" size={25} mr={20} />
            <InputComp
              name="number"
              id="number"
              type="number"
              entry={number()}
              setEntry={setNumber}
              nb={computeLen()}
              isInvalid={identity}
              setDisabled={setDisabled}
              validations={validations()}
              setValidations={setValidations}
            />
            <br />
            <Emoji label="📞" size={25} mr={20} />
            <InputComp
              name="tel"
              id="tel"
              type="tel"
              entry={tel()}
              setEntry={setTel}
              nb={computeLen()}
              isInvalid={identity}
              setDisabled={setDisabled}
              validations={validations()}
              setValidations={setValidations}
            />
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
                  entry={color()}
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
              <span>Select from gallery:</span>
              <Emoji label="📸" size={30} ml={20} />
              {/* <ImgSVG src={camera} alt="fileDownload" width={40} height={40} /> */}
              <InputComp
                capture
                ref={picInput}
                hidden
                name="picture"
                id="picture"
                type="file"
                entry={picture()}
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
