import { createSignal, batch, createEffect } from "solid-js";
import { css, styled } from "solid-styled-components";
import imgSVG from "../components/imgSVG";

export default (context) => (props) => {
  const {
    theme: { shadows, palette },
  } = context;

  const inputCSS = `
    box-shadow: ${shadows[4]};
    border-radius: 4px;
    border: 2px solid transparent;
    font-size: 1em;
    box-sizing: border-box;
    padding: 1em 10px 1em 0.5em;
    margin-bottom: 1em;
    outline: none;
    &:hover {
      box-shadow: ${shadows[8]};
    }
    &:not(:focus):not(:placeholder-shown):invalid {
      border-color: red;
    }
  `;

  const ImgSVG = imgSVG(context);

  const newClass = (props) =>
    props.height ? `height: ${props.height}px;` : null;

  const ErrorOutput = styled("output")`
    color: red;
    margin-left: 4px;
    font-size: 0.8em;
    display: flex; /* place below input*/
  `;

  const InputBlock = styled("div")`
    /* to be able to place an SVG before the input*/
    display: inline-block;
  `;

  const [msg, setMsg] = createSignal(null);

  const handleInput = ({ target }) => {
    if (target.value) {
      const { invalid, msg } = props.isInvalid(target.value);
      batch(() => {
        setMsg(msg);
        props.setEntry(target.value);
        props.setValidations({ ...props.validations, [target.name]: invalid });
        props.setDisabled(checkDisabled());
      });
    }
    if (target.files) {
      batch(() => {
        props.setEntry(target.files);
        props.setValidations({ ...props.validations, [target.name]: false });
        props.setDisabled(false);
      });
    }
  };

  const checkDisabled = () => {
    const object = Object.entries(props.validations) || [];
    // early disable if not all inputs filled
    if (object.length < props.nb) return true;
    // if one of the inputs has invalid state true, then disable
    return object.reduce((acc, [k, v]) => acc || v, false);
  };

  return (
    <InputBlock>
      <ImgSVG src={props.svg} width={15} alt={props.alt} />
      <input
        class={css`
          ${props.height ? inputCSS + newClass(props) : inputCSS}
        `}
        name={props.name}
        placeholder={props.name}
        type={props.type}
        value={props.type !== "file" ? props.entry : null}
        onInput={handleInput}
        autocomplete={props?.autocomplete}
        {...props}
      />
      <ErrorOutput>{msg()}</ErrorOutput>
    </InputBlock>
  );
};
