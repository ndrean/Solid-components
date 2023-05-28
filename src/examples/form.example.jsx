import { createSignal, createEffect, createMemo } from "solid-js";
import { styled, css } from "solid-styled-components";
import inputComponent from "../components/inputComponent";
import checkbox from "../components/checkbox";
import dialogComponent from "../components/dialogComponent";
import { dTitle } from "../components/title";

import button from "../components/button";
import grayDiv from "../components/grayDiv";
import Unicode from "../components/Unicode";

import keySVG from "../assets/keySVG.svg";
import personSVG from "../assets/personSVG.svg";
import emailSVG from "../assets/emailSVG.svg";

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

const InputDiv = styled("div")`
  display: inline-block;
`;

export default (context) => (props) => {
  const {
    classes: { stdTitle },
    codes: { cross },
  } = context;

  // DOM references
  let output, formEx, passwordInput, passwordConfInput, diag, pwdCBx, pwdConfBx;

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
  const [pwdCheckbox, setPwdCheckbox] = createSignal(false);
  const [pwdConfCheckbox, setPwdConfCheckbox] = createSignal(false);

  const Input = inputComponent(context);

  const Button = button(context);
  const GrayDiv = grayDiv(context);
  const Checkbox = checkbox(context);

  const centered = `
    text-align: center;
  `;

  const Title = dTitle("h1", stdTitle, centered);

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

  const formReset = () => {
    formEx.reset();
    setEmail(null);
    setName(null);
    setPassword(null);
    setPasswordConf(null);
    setPwdCheckbox(false);
    setPwdConfCheckbox(false);
    passwordInput.type = "password";
    passwordConfInput.type = "password";
    diag.close();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password() !== passwordConf())
      return (output.value = "Passwords don't match");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // do something.... we print it out.
    output.value = JSON.stringify(data, null, "\t");
    formReset();
  };

  const revealPassword = (e, ref) => {
    if (e.target.checked) {
      ref.type = "text";
    } else {
      ref.type = "password";
    }
  };

  const openDialog = () => {
    output.value = "";
    diag.showModal();
  };

  // createEffect(() => console.log(pwdCheckbox()));

  const optCssDialog = `padding: 0px 5px 0px 5px;`;
  const Dialog = dialogComponent(context)(optCssDialog);

  return (
    <section id="form.examples">
      <button onClick={openDialog}>open</button>
      <Dialog ref={diag}>
        <header>
          <Title>Credentials</Title>
        </header>
        <main>
          <form id="form-ex" onSubmit={handleSubmit} ref={formEx}>
            <InputDiv>
              <Input
                svg={personSVG}
                alt="personSVG"
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
            </InputDiv>
            <br />
            <InputDiv>
              <Input
                svg={emailSVG}
                alt="emailSVG"
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
            </InputDiv>
            <br />
            <PasswordContainer>
              <InputDiv>
                <Input
                  svg={keySVG}
                  alt="keySVG"
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
              </InputDiv>
              <Label>
                <Checkbox
                  id="pwdCheckbox"
                  required={false}
                  value={pwdCheckbox()}
                  onChange={(e) => {
                    revealPassword(e, passwordInput);
                    setPwdCheckbox((v) => !v);
                  }}
                />
                Show Password
              </Label>
            </PasswordContainer>
            <br />
            <PasswordContainer>
              <Input
                svg={keySVG}
                alt="keySVG"
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
                  value={pwdConfCheckbox()}
                  onChange={(e) => {
                    revealPassword(e, passwordConfInput);
                    setPwdCheckbox((v) => !v);
                  }}
                />
                Show Password
              </Label>
            </PasswordContainer>
          </form>
        </main>
        <footer>
          <Button onClick={formReset} autofocus>
            <Unicode size="1.5em" code={cross} />
          </Button>
          <Button form="form-ex" disabled={disabled()} raised ripple>
            Submit the form
          </Button>
        </footer>
      </Dialog>
      <p>You submitted to the server the data below:</p>
      <GrayDiv>
        <output ref={output}></output>
      </GrayDiv>
    </section>
  );
};
