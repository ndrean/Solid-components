import { createSignal, batch } from "solid-js";

export default () => {
  let output;
  const [entry, setEntry] = createSignal("");
  const [disabled, setDisabled] = createSignal(true);
  const isInvalid = (data) => (data.length < 3 ? true : false);
  const handleInput = ({ currentTarget: { value } }) =>
    batch(() => {
      setEntry(value);
      setDisabled(isInvalid(value));
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    output.value = entry();
  };

  return (
    <>
      <form id="forms" onSubmit={handleSubmit}>
        <input
          autofocus
          required
          type="text"
          value={entry()}
          onInput={handleInput}
        />
        <button form="forms" disabled={disabled()}>
          Submit
        </button>
      </form>
      <p>
        Result: <output ref={output}> </output>
      </p>
    </>
  );
};
