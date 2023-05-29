import { createSignal, batch, createEffect } from "solid-js";
import { styled, css } from "solid-styled-components";

const ErrorOutput = styled("div")`
  color: red;
  margin-left: 20px;
  margin-top: -10px;
  font-size: 0.8em;
`;
export { ErrorOutput };

export default (context) => (props) => {
  const {
    theme: { shadows, palette },
  } = context;

  const inputCSS = (p) => `
    box-shadow: ${shadows[4]};
    border-radius: 4px;
    border: 2px solid transparent;
    font-size: 1em;
    box-sizing: border-box;
    padding: 1em 10px 1em 0.5em;
    margin-bottom: 1em;
    overflow-x: scroll;
    outline: none;
    &:hover {
      box-shadow: ${shadows[10]};
    }
    &:not(:focus):not(:placeholder-shown):invalid {
      border-color: red;
    }
    border-color: ${onError() && "red"};
    `;

  const newClass = (props) => {
    if (props.height || props.width)
      return `
    height: ${props.height + "em"};
    width: ${props.width + "em"};
    `;
  };

  /* to be able to place an SVG before the input*/
  const InputBlock = styled("div")`
    display: inline-block;
  `;

  const [msg, setMsg] = createSignal(null);
  const [onError, setOnError] = createSignal(false);
  createEffect(() => console.log(onError()));

  const handleInput = ({ target }) => {
    if (target.value) {
      const { invalid, msg } = props.isInvalid(target.value);
      batch(() => {
        setMsg(msg);
        props.setEntry(target.value);
        props.setValidations({ ...props.validations, [target.name]: invalid });
        props.setDisabled(checkDisabled());
        if (props.border) {
          console.log("border");
          setOnError((v) => !v);
        }
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

  console.log(props.onError);
  return (
    <InputBlock>
      <input
        class={css`
          ${props.height ? inputCSS(props) + newClass(props) : inputCSS(props)}
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
