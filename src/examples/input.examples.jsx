import { createSignal, createMemo, createEffect } from "solid-js";
import { styled } from "solid-styled-components";

import inputComponent from "../components/inputComponent";
import imgSVG from "../components/imgSVG";
import button from "../components/button";
import grayDiv from "../components/grayDiv";
import submit from "../assets/submit.webp";
import dynamite from "../assets/dynamite.webp";
// import fileDownload from "../assets/fileDownload.svg";
import camera from "../assets/camera.svg";

const Label = styled("label")`
  display: flex;
  align-items: center;
  label {
    margin-left: 1rem;
  }
`;

export default (context) => {
  const InputComp = inputComponent(context);
  const GrayDiv = grayDiv(context);
  const ImgSVG = imgSVG();

  let output, picInput, preview, previewer;

  const [date, setDate] = createSignal(null);
  const [search, setSearch] = createSignal(null);
  const [number, setNumber] = createSignal(null);
  const [tel, setTel] = createSignal(null);
  const [color, setColor] = createSignal(null);
  const [picture, setPicture] = createSignal(null);
  const [fun, setFun] = createSignal(true);

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

  const randomBoolean = () => Math.random() >= 0.5;

  const supported = "mediaDevices" in navigator;

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
    setFun(randomBoolean());
    console.log(fun());
    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);
    // do something.... we print it out.
    output.value = JSON.stringify(object);
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
        <form id="form-inputs" onSubmit={handleSubmit}>
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
          <InputComp
            name="date"
            id="date"
            type="date"
            entry={date()}
            setEntry={setDate}
            nb={computeLen()}
            isInvalid={constraints["date"]}
            setDisabled={setDisabled}
            validations={validations()}
            setValidations={setValidations}
          />
          <br />
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
          <label>
            Pick up a color:
            <InputComp
              height={60}
              width={80}
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
          <br />

          {/* <Label>
            Take a pic or upload file
            <ImgSVG
              src={fileDownload}
              alt="fileDownload"
              width={40}
              height={40}
            />
            <InputComp
              ref={fileInput}
              hidden
              label="file"
              name="file"
              id="file"
              type="file"
              entry={file()}
              setEntry={setFile}
              nb={computeLen()}
              isInvalid={constraints["file"]}
              setDisabled={setDisabled}
              validations={validations()}
              setValidations={setValidations}
              accept="*.doc, .pdf"
            />
          </Label> */}
          <br />
          <Label>
            <span>Select from gallery:</span>
            <ImgSVG src={camera} alt="fileDownload" width={40} height={40} />
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
        </form>
      </StylingDiv>
      <br />
      <div style={{ "text-align": "center" }}>
        <input
          type="image"
          id="submit"
          form="form-inputs"
          src={fun() ? dynamite : submit}
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
