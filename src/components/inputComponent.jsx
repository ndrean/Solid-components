import { createSignal, batch } from "solid-js";
import { css, styled } from "solid-styled-components";

export default (context) => (props) => {
  const {
    theme: { shadows, palette },
  } = context;

  const inputCSS = css`
    box-shadow: ${shadows[2]};
    border-radius: 4px;
    border: 2px solid transparent;
    font-size: 1em;
    box-sizing: border-box;
    padding: 1em 10px 1em 0.5em;
    margin-bottom: 1em;
    outline: none;
    &:hover {
      box-shadow: ${shadows[4]};
    }
  `;

  const ErrorOutput = styled("output")`
    color: red;
    margin-left: 4px;
    font-size: 0.8em;
  `;

  const [msg, setMsg] = createSignal(null);

  const handleInput = ({ target: { value, name } }) => {
    const { invalid, msg } = props.isInvalid(value);
    batch(() => {
      setMsg(msg);
      props.setEntry(value);
      props.setValidations({ ...props.validations, [name]: invalid });
      props.setDisabled(checkDisabled());
    });
  };

  const checkDisabled = () => {
    const object = Object.entries(props.validations) || [];
    // early disable if not all inputs filled
    if (object.length < props.nb) return true;
    // if one of the inputs has invalid state true, then disable
    return object.reduce((acc, [k, v]) => acc || v, false);
  };

  return (
    <div style={{ display: "inline-block" }}>
      {/* <label style={{ "padding-right": "10px" }}>{props.label}</label> */}
      <input
        class={inputCSS}
        autofocus
        required
        name={props.name}
        placeholder={props.name}
        type={props.type}
        value={props.entry}
        onInput={handleInput}
        autocomplete={props?.autocomplete}
      />
      <ErrorOutput>{msg()}</ErrorOutput>
    </div>
  );
};
