import {
  createSignal,
  createMemo,
  onMount,
  onCleanup,
  createEffect,
} from "solid-js";
import { styled } from "solid-styled-components";
import inputComponent from "../components/inputComponent";
import checkbox from "../components/checkbox";
import dialogComponent, { resetIfOut } from "../components/dialogComponent";
import { dTitle } from "../components/utilities/title";
import contentDiv from "./ContentDiv";
import button from "../components/button";
import grayDiv from "../components/utilities/grayDiv";
import Unicode from "../components/typo/Unicode";

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
  margin-left: 20px;
`;

const PwdCheckErrorMsg = styled("output")`
  color: red;
  margin-left: 20px;
  margin-top: -10px;
  font-size: 0.8em;
  display: flex; /* place below input*/
`;

export default (context) => (props) => {
  const {
    classes: { stdTitle },
    codes: { cross },
  } = context;

  // DOM references
  let output, formEx, passwordInput, passwordConfInput, diag, pwdCheck;

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
  const ContentDiv = contentDiv(context);
  const Button = button(context);
  const GrayDiv = grayDiv(context);
  const Checkbox = checkbox(context);

  const Title = dTitle("h1", stdTitle);

  const dialogCSS = `border-radius: 10px;`;
  const Dialog = dialogComponent(context)(dialogCSS);

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
    }

    return { invalid: false, msg: null };
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

  createEffect(() => {
    if (password() !== passwordConf() && passwordConf() !== null) {
      pwdCheck.value = "Passwords don't match";
      setDisabled(true);
    } else {
      pwdCheck.value = "";
      setDisabled(false);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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

  // close dialog if click outside
  onMount(() => {
    diag.addEventListener("click", (e) => {
      if (resetIfOut(e, diag)) formReset();
    });
  });
  onCleanup(() => removeEventListener("click", (e) => resetIfOut(e, diag)));

  return (
    <section id="form.examples">
      <Button fullWidth primary raised onClick={openDialog}>
        Open Login form
      </Button>
      <Dialog ref={diag}>
        <ContentDiv>
          <header class="header">
            <h1>Credentials</h1>
          </header>
          <form class="main" id="form-ex" onSubmit={handleSubmit} ref={formEx}>
            <Input
              svg={personSVG}
              alt="personSVG"
              required
              autofocus
              pattern="^(\w+){4,}"
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
            <br />
            <PasswordContainer>
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
                autocomplete
                isInvalid={constraints["password"]}
                setDisabled={setDisabled}
                validations={validations()}
                setValidations={setValidations}
              />
              <Label>
                <Checkbox
                  size={1}
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
                  size={1}
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
          <footer class="footer">
            <PwdCheckErrorMsg ref={pwdCheck}></PwdCheckErrorMsg>
            <Button onClick={formReset} autofocus>
              <Unicode size="1.5em" code={cross} />
            </Button>
            <Button
              flat
              primary
              form="form-ex"
              disabled={disabled()}
              raised
              ripple
            >
              Submit the form
            </Button>
          </footer>
        </ContentDiv>
      </Dialog>
      <p>You submitted to the server the data below:</p>
      <GrayDiv>
        <output ref={output}></output>
      </GrayDiv>
    </section>
  );
};
