import { createSignal, createMemo, createEffect } from "solid-js";
import { styled } from "solid-styled-components";

import inputComponent from "../components/inputComponent";
import imgSVG from "../components/imgSVG";
import button from "../components/button";
import grayDiv from "../components/grayDiv";
import submit from "../assets/submit.webp";
import camera from "../assets/camera.svg";
import drawEmoji from "../components/drawEmoji";

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

export default (context) => {
  const InputComp = inputComponent(context);
  const GrayDiv = grayDiv(context);
  const ImgSVG = imgSVG();
  const Emoji = drawEmoji(context);

  let output, picInput, preview, previewer, formInputs;

  const [date, setDate] = createSignal(null);
  const [search, setSearch] = createSignal(null);
  const [number, setNumber] = createSignal(null);
  const [tel, setTel] = createSignal(null);
  const [color, setColor] = createSignal("#7580d7");
  const [picture, setPicture] = createSignal(null);

  const [disabled, setDisabled] = createSignal(true);
  const [validations, setValidations] = createSignal({});

  const constraints = {
    date: (t) => t,
    search: (t) => t,
    number: (t) => t,
    tel: (t) => t,
    color: (t) => t,
    picture: (t) => t,
  };

  const PreviewerDialog = (props) => {
    const Button = button(context);
    return (
      <dialog ref={previewer}>
        <img
          ref={preview}
          alt="preview"
          role="img"
          height={props.height || 200}
        />
        <Button
          type="submit"
          onClick={() => {
            previewer.close();
          }}
        >
          close
        </Button>
      </dialog>
    );
  };

  const StylingDiv = styled("div")((props) => ({
    padding: "2em",
    background: `linear-gradient(white, ${props.color})`,
  }));

  const computeLen = createMemo(() => Object.entries(constraints).length);

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
    const name = formData.get("picture").name;
    formData.append("picture", name);
    const object = Object.fromEntries(formData);
    output.value = JSON.stringify(object, null, "\t");
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
            <legend>A collection of inputs</legend>
            <Emoji label="🔎" size={25} mr={20} />
            <InputComp
              id="search"
              name="search"
              type="search"
              entry={search()}
              setEntry={setSearch}
              nb={computeLen()}
              isInvalid={constraints["search"]}
              setDisabled={setDisabled}
              validations={validations()}
              setValidations={setValidations}
            />
            <br />
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
            <Emoji label="🧮" size={25} mr={20} />
            <InputComp
              name="number"
              id="number"
              type="number"
              entry={number()}
              setEntry={setNumber}
              nb={computeLen()}
              isInvalid={constraints["number"]}
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
              isInvalid={constraints["tel"]}
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
                  isInvalid={constraints["color"]}
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
                isInvalid={constraints["picture"]}
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
