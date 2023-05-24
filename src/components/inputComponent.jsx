import { createSignal, batch } from "solid-js";
export default (context) => (props) => {
  const [msg, setMsg] = createSignal(null);

  const handleInput = ({ currentTarget: { value } }) =>
    batch(() => {
      const { invalid, msg } = props.isInvalid(value);
      props.setEntry(value);
      props.setDisabled(invalid);
      setMsg(msg);
    });

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
      />
      <output>{msg()}</output>
    </div>
  );
};
