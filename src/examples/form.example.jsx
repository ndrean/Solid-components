import { createSignal, createEffect, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import inputComponent from "../components/inputComponent";
import checkbox from "../components/checkbox";

import button from "../components/button";
import grayDiv from "../components/grayDiv";

// const Span = styled("span")`
//   color: red;
//   margin-left: 10px;
// `;

const PasswordContainer = styled("div")`
  display: flex;
  flex-direction: column;
`;

const Label = styled("label")`
  display: flex;
  align-items: center;
  label {
    margin-left: 1rem;
  }
`;

export default (context) => (props) => {
  // DOM references
  let output, formEx, passwordInput, passwordConfInput;

  // state of form submit button
  const [disabled, setDisabled] = createSignal(true);

  // object where the keys are the name of the input and values are validity of the input
  //  in the form {name: false, email: false, password,...}
  const [validations, setValidations] = createSignal({});

  //   Create an entry per input
  const [name, setName] = createSignal(null);
  const [email, setEmail] = createSignal(null);
  const [password, setPassword] = createSignal(null);
  const [passwordConf, setPasswordConf] = createSignal(null);

  const Input = inputComponent(context);
  const Button = button(context);
  const GrayDiv = grayDiv(context);
  const Checkbox = checkbox(context);

  //<----- Define the validations functions for each input

  // we can pass the corresponding input validation per input name
  const constraints = {
    name: isInvalidLength,
    email: isInvalidEmail,
    password: isInvalidPassword,
    passwordConf: isInvalidPassword,
  };

  function isInvalidLength(data) {
    if (!data) return { invalid: true, msg: null };
    if (data?.length < 4) {
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
    if (!data) return { invalid: true, msg: null };
    if (data?.length < 4) {
      return {
        invalid: true,
        msg: "Min 4 characters ",
      };
    } else {
      return { invalid: false, msg: null };
    }
  }
  // end of constraints--->

  const computeLen = createMemo(() => Object.entries(constraints).length);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password() !== passwordConf())
      return (output.value = "Passwords don't match");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    formEx.reset();
    // do something.... we print it out.
    output.value = JSON.stringify(data);
  };

  const revealPassword = (e, ref) => {
    if (e.target.checked) {
      ref.type = "text";
    } else {
      ref.type = "password";
    }
  };

  return (
    <section id="form.examples">
      <form id="form-ex" onSubmit={handleSubmit} ref={formEx}>
        <Input
          required
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
          required
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
        <PasswordContainer>
          <Input
            required
            ref={passwordInput}
            label="password"
            name="password"
            type="password"
            entry={password()}
            setEntry={setPassword}
            nb={computeLen()}
            // autocomplete="off"
            isInvalid={constraints["password"]}
            setDisabled={setDisabled}
            validations={validations()}
            setValidations={setValidations}
          />
          <Label>
            <Checkbox
              id="pwdCheckbox"
              required={false}
              onChange={(e) => revealPassword(e, passwordInput)}
            />
            Show Password
          </Label>
        </PasswordContainer>
        <br />
        <PasswordContainer>
          <Input
            required
            ref={passwordConfInput}
            label="passwordConf"
            name="passwordConf"
            type="password"
            disabled={isInvalidPassword(password())?.invalid}
            entry={passwordConf()}
            setEntry={setPasswordConf}
            nb={computeLen()}
            autocomplete="off"
            isInvalid={constraints["passwordConf"]}
            setDisabled={setDisabled}
            validations={validations()}
            setValidations={setValidations}
          />
          <Label>
            <Checkbox
              id="pwdConfCheckbox"
              required={false}
              onChange={(e) => revealPassword(e, passwordConfInput)}
            />
            Show Password
          </Label>
        </PasswordContainer>
      </form>
      <p>
        This form submits a <code> FORMDATA </code>
      </p>
      <Button form="form-ex" disabled={disabled()} fullWidth ripple>
        Submit the form
      </Button>
      <br />

      <p>You submitted to the server the data below:</p>
      <GrayDiv>
        <output ref={output}></output>
      </GrayDiv>
    </section>
  );
};
