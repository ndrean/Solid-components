import {
  createSignal,
  createMemo,
  onMount,
  onCleanup,
  createEffect,
} from "solid-js";
import { styled } from "solid-styled-components";
import inputComponent, { ErrorOutput } from "../input/inputComponent";
import checkbox from "../checkbox/checkbox";
import dialogComponent, { resetIfOut } from "../dialog/dialogComponent";
import { dTitle } from "../app/title";
import contentDiv from "../dialog/ContentDiv";
import button from "../button/button";
import grayDiv from "../app/grayDiv";
import Unicode from "../typo/Unicode";

import keySVG from "../assets/keySVG.svg";
import personSVG from "../assets/personSVG.svg";
import emailSVG from "../assets/emailSVG.svg";
import imgSVG from "../typo/imgSVG";

const PasswordContainer = styled("div")`
  display: flex;
  flex-direction: column;
`;

const Label = styled("label")`
  display: flex;
  align-items: center;
  margin-left: 20px;
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
  const Dialog = dialogComponent(context);

  const ImgSVG = imgSVG(context);

  /* to be able to place an SVG before the input*/
  const InputBlock = styled("div")`
    display: flex;
    align-items: center;
  `;

  const CustomInput = (props) => (
    <InputBlock>
      {props.svg && (
        <ImgSVG
          src={props.svg}
          width={15}
          alt={props.alt}
          style={{ "margin-right": "50px" }}
        />
      )}
      <Input {...props} />
    </InputBlock>
  );
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
      pwdCheck.textContent = "Passwords don't match";
      setDisabled(true);
    } else {
      pwdCheck.textContent = "";
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
      <p>
        A form with <code> inputComponent </code> is presented in a dialog
        component.{" "}
      </p>
      <p>
        This component should receive defined in the form component and passed
        down to the input component.
      </p>
      <p>
        You also need to define and append to the "constraints" object a
        validation function for this input into the <code> isInvalid </code>{" "}
        prop. This function returns an object \u007B invalid: bool, msg:
        "text"\u007D to update the "validations" signal, thus we also pass a{" "}
        <code> validations </code> props. This will be used to disable the
        "submit" button".
      </p>
      <p>
        {" "}
        The input component exports an <code> ErrorOutput </code> component. You
        can exploit both the browser validations (via CSS) and your own
        validations: the first highlights the cell in red and the later disables
        the SUBMIT button and returns a message displayed in the ErrorOutput
        box. Besides the browser validation, you can still pass in the computed
        validations by setting a prop <code> borderError </code> in the input.
      </p>
      <Button fullWidth primary raised onClick={openDialog}>
        Open Login form
      </Button>
      <Dialog ref={diag} optCss={dialogCSS}>
        <ContentDiv>
          <header class="header">
            <h1>Credentials</h1>
          </header>
          <form class="main" id="form-ex" onSubmit={handleSubmit} ref={formEx}>
            <CustomInput
              svg={personSVG}
              alt="personSVG"
              required
              autofocus
              pattern="^(\w+){4,}"
              label="name"
              name="name"
              type="text"
              setEntry={setName}
              nb={computeLen()}
              isInvalid={constraints["name"]}
              setDisabled={setDisabled}
              validations={validations()}
              setValidations={setValidations}
            />
            <br />
            <CustomInput
              svg={emailSVG}
              alt="emailSVG"
              required
              label="email"
              name="email"
              type="email"
              setEntry={setEmail}
              nb={computeLen()}
              isInvalid={constraints["email"]}
              setDisabled={setDisabled}
              validations={validations()}
              setValidations={setValidations}
            />
            <br />
            <PasswordContainer>
              <CustomInput
                svg={keySVG}
                alt="keySVG"
                required
                ref={passwordInput}
                label="password"
                name="password"
                type="password"
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
              <CustomInput
                svg={keySVG}
                alt="keySVG"
                required
                ref={passwordConfInput}
                label="passwordConf"
                name="passwordConf"
                type="password"
                disabled={isInvalidPassword(password())?.invalid}
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
            <ErrorOutput ref={pwdCheck}></ErrorOutput>
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
