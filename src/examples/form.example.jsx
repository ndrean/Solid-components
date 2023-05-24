import { createSignal } from "solid-js";
import inputComponent from "../components/inputComponent";
import button from "../components/button";

export default (context) => (props) => {
  let output;

  const [text, setText] = createSignal(null);
  const [email, setEmail] = createSignal(null);
  const [disabled, setDisabled] = createSignal(true);

  const Input = inputComponent(context);
  const Button = button(context);
  //
  const isInvalidLength = (data) => {
    if (data.length < 3) {
      return {
        invalid: true,
        msg: () => <span style={{ color: "red" }}>"Too short"</span>,
      };
    } else {
      return { invalid: false, msg: null };
    }
  };

  const isInvalidEmail = (data) => {
    console.log(data, /^[\w]+@[\w]+.[\w]{2,4}$/.test(data));
    if (/^[\w]+@[\w]+.[\w]{2,4}$/.test(data)) {
      return { invalid: false, msg: null };
    } else {
      return {
        invalid: true,
        msg: () => <span style={{ color: "red" }}>Not a valid email</span>,
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    output.value = JSON.stringify(Object.fromEntries(formData));
  };

  return (
    <>
      <form id="forms" onSubmit={handleSubmit}>
        <Input
          label="name"
          name="name"
          type="text"
          entry={text()}
          setEntry={setText}
          isInvalid={isInvalidLength}
          setDisabled={setDisabled}
        />
        <br />
        <Input
          label="email"
          name="email"
          type="email"
          isInvalid={isInvalidEmail}
          entry={email()}
          setEntry={setEmail}
          setDisabled={setDisabled}
        />
        <br />
      </form>
      <p>You can submit this form:</p>
      <Button form="forms" disabled={disabled()} ripple>
        Submit
      </Button>
      <p>
        Result: <output ref={output}> </output>
      </p>
    </>
  );
};
