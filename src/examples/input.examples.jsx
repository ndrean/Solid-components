import { createSignal, createMemo, createEffect } from "solid-js";
// import { css } from "solid-styled-components";

import inputComponent from "../components/inputComponent";
import imgSVG from "../components/imgSVG";
// import button from "../components/button";
import grayDiv from "../components/grayDiv";
import submitPNG from "../assets/submit.png";
import fileDownload from "../assets/fileDownload.svg";
import camera from "../assets/camera.svg";

export default (context) => {
  const InputComp = inputComponent(context);
  const GrayDiv = grayDiv(context);
  const ImgSVG = imgSVG();

  return () => {
    const [date, setDate] = createSignal(null);
    const [search, setSearch] = createSignal(null);
    const [number, setNumber] = createSignal(null);
    const [tel, setTel] = createSignal(null);
    const [color, setColor] = createSignal(null);
    const [file, setFile] = createSignal(null);
    const [picture, setPicture] = createSignal(null);

    const [disabled, setDisabled] = createSignal(true);
    const [validations, setValidations] = createSignal({});

    const constraints = {
      date: (t) => t,
      search: (t) => t,
      number: (t) => t,
      tel: (t) => t,
      color: (t) => t,
      file: (t) => t,
      picture: (t) => t,
    };

    const supported = "mediaDevices" in navigator;

    const computeLen = createMemo(() => Object.entries(constraints).length);

    let output, fileInput, picInput;
    createEffect(() => {
      fileInput.style.opacity = 0;
      fileInput.style.width = 0;
      fileInput.style.height = 0;
      fileInput.style.margin = 0;
      fileInput.style.padding = 0;

      picInput.style.opacity = 0;
      picInput.style.width = 0;
      picInput.style.height = 0;
      picInput.style.margin = 0;
      picInput.style.padding = 0;
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const object = Object.fromEntries(formData);
      // do something.... we print it out.
      output.value = JSON.stringify(object);
    };

    return (
      <>
        <form id="form-inputs" onSubmit={handleSubmit}>
          <InputComp
            label="search"
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
            label="date"
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
            label="number"
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
            label="tel"
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
            <InputComp
              label="color"
              name="color"
              id="color"
              type="color"
              entry={color()}
              setEntry={setColor}
              nb={computeLen()}
              isInvalid={constraints["color"]}
              setDisabled={setDisabled}
              validations={validations()}
              setValidations={setValidations}
            />
            Pick up a color
          </label>
          <br />

          <label style={{ display: "flex", "align-items": "center" }}>
            <span>Download a file:</span>
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
              accept=" .pdf, .doc*"
            />
          </label>
          <br />
          <label style={{ display: "flex", "align-items": "center" }}>
            <span>Take a pic:</span>
            <ImgSVG src={camera} alt="fileDownload" width={40} height={40} />
            <InputComp
              ref={picInput}
              hidden
              label="picture"
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
            />
          </label>
        </form>
        <input
          type="image"
          id="submit"
          form="form-inputs"
          src={submitPNG}
          alt="submit button"
          height={30}
        >
          Submit
        </input>
        <GrayDiv></GrayDiv>
        <output ref={output}></output>
      </>
    );
  };
};

// URL.createObjectURL(e.target.files[0])
