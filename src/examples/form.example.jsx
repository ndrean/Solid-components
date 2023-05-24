import { createSignal, createEffect, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import inputComponent from "../components/inputComponent";
import button from "../components/button";
import grayDiv from "../components/grayDiv";

const Span = styled("span")`
  color: red;
  margin-left: 10px;
`;
export default (context) => (props) => {
  let output;

  const [disabled, setDisabled] = createSignal(true);

  // object where the keys are the name of the input and values are validity of the input
  //  in the form {name: false, email: false, password,...}
  const [validations, setValidations] = createSignal({});

  //   Create an entry per input
  const [name, setName] = createSignal(null);
  const [email, setEmail] = createSignal(null);
  const [password, setPassword] = createSignal(null);

  const Input = inputComponent(context);
  const Button = button(context);
  const GrayDiv = grayDiv(context);

  //<----- Define the validations functions for each input

  // we can pass the corresponding input validation per input name
  const constraints = {
    name: isInvalidLength,
    email: isInvalidEmail,
    password: isInvalidPassword,
  };

  function isInvalidLength(data) {
    if (data.length < 4) {
      return {
        invalid: true,
        msg: "Min 4 characters",
      };
    } else {
      return { invalid: false, msg: null };
    }
  }

  function isInvalidEmail(data) {
    if (/^[\w]+@[\w]+.[\w]{2,4}$/.test(data)) {
      return { invalid: false, msg: null };
    } else {
      return {
        invalid: true,
        msg: "Valid email format: xx@xx.xx",
      };
    }
  }

  function isInvalidPassword(data) {
    if (data.length < 5) {
      return {
        invalid: true,
        msg: "Min 5 characters ",
      };
    } else {
      return { invalid: false, msg: null };
    }
  }
  // end of constraints--->

  const computeLen = createMemo(() => Object.entries(constraints).length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);
    // do something.... we print it out.
    output.value = JSON.stringify(object);
  };

  return (
    <>
      <form id="forms" onSubmit={handleSubmit}>
        <Input
          label="name"
          name="name"
          type="text"
          entry={name()}
          setEntry={setName}
          nb={computeLen()}
          isInvalid={constraints["name"]}
          setDisabled={setDisabled}
          validations={validations()}
          setValidations={setValidations}
        />
        <br />
        <Input
          label="email"
          name="email"
          type="email"
          entry={email()}
          setEntry={setEmail}
          nb={computeLen()}
          isInvalid={constraints["email"]}
          setDisabled={setDisabled}
          validations={validations()}
          setValidations={setValidations}
        />
        <br />
        <Input
          label="password"
          name="password"
          type="password"
          entry={password()}
          setEntry={setPassword}
          nb={computeLen()}
          autocomplete="off"
          isInvalid={constraints["password"]}
          setDisabled={setDisabled}
          validations={validations()}
          setValidations={setValidations}
        />
      </form>
      <p>
        This form is submitted with a <code> FORMDATA </code>
      </p>
      <Button form="forms" disabled={disabled()} fullWidth ripple>
        Submit the form
      </Button>
      <br />

      <p>You submitted to the server the data below:</p>
      <GrayDiv>
        <output ref={output}> </output>
      </GrayDiv>
    </>
  );
};
