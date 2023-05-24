import { createSignal, batch } from "solid-js";
export default (context) => (props) => {
  const [msg, setMsg] = createSignal(null);

  const handleInput = ({ target: { value, name } }) => {
    batch(() => {
      const { invalid, msg } = props.isInvalid(value);
      setMsg(msg);
      props.setEntry(value);
      props.setValidations({ ...props.validations, [name]: invalid });
      props.setDisabled(checkDisabled());
    });
  };

  const checkDisabled = () => {
    const object = Object.entries(props.validations) || [];
    const len = props.validations.length;
    console.log("len", object.length, len);
    if (object.length < props.nb) return true;
    return object.reduce((acc, [k, v]) => acc || v, false);
  };

  return (
    <div style={{ display: "inline-block" }}>
      <label style={{ "padding-right": "10px" }}>{props.label}</label>
      <input
        autofocus
        required
        name={props.name}
        type={props.type}
        value={props.entry}
        onInput={handleInput}
        autocomplete={props?.autocomplete}
      />
      <output>{msg()}</output>
    </div>
  );
};
