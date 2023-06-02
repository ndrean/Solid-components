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
import dialogComponent from "../dialog/dialogComponent";
// additional elements on this page
import contentDiv from "../dialog/ContentDiv";
import button from "../button/button";
import grayDiv from "../app/pages/grayDiv";
import Unicode from "../typo/Unicode";
import keySVG from "../assets/keySVG.svg";
import personSVG from "../assets/personSVG.svg";
import emailSVG from "../assets/emailSVG.svg";
import ImgSVG from "../typo/ImgSVG";

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

  // <-- page styling elements
  const ContentDiv = contentDiv(context);
  const Button = button(context);
  const GrayDiv = grayDiv(context);
  const dialogCSS = `border-radius: 10px;`;
  const Dialog = dialogComponent(context);

  const InputBlock = styled("div")`
    display: flex;
    align-items: center;
  `;
  // -->

  // DOM references
  let output, formEx, passwordInput, passwordConfInput, diag, pwdCheck;
  // state of form SUBMIT button
  const [disabled, setDisabled] = createSignal(true);

  // keys are the name of the input, values are boolean validity of the input
  //  in the form {name: false, email: false, password,...}
  const [validations, setValidations] = createSignal({});

  //   Create an entry per input
  const [name, setName] = createSignal(null);
  const [email, setEmail] = createSignal(null);
  const [password, setPassword] = createSignal(null);
  const [passwordConf, setPasswordConf] = createSignal(null);
  const [pwdCheckbox, setPwdCheckbox] = createSignal(false);
  const [pwdConfCheckbox, setPwdConfCheckbox] = createSignal(false);

  const InputComponent = inputComponent(context);
  const Checkbox = checkbox(context);

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
      <InputComponent {...props} />
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
    if (password() !== passwordConf()) {
      setDisabled(true);
      return (pwdCheck.textContent = "Passwords don't match");
    }
    return (pwdCheck.textContent = "");
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
  // onMount(() => {
  //   diag.addEventListener("click", (e) => {
  //     if (clickOut(e, diag)) formReset();
  //   });
  // });
  // onCleanup(() => removeEventListener("click", (e) => clickOut(e, diag)));

  return (
    <section id="form.examples">
      <p>
        A form using <code> inputComponent </code> is presented in a{" "}
        <code> dialogComponent </code>.
      </p>
      <p>
        The form should contain the state of each input as a "signal". These are
        passed down to the <code> inputComponent</code>.
      </p>
      <br />
      <details>
        <summary>About the SUBMIT button control</summary>
        The SUBMIT button is controlled and enabled when all the validations on
        the inputs are validated. You need to code this validation function and
        append its reference to the "constraints" object. This function returns
        an object \u007Binvalid: bool, msg: "text"\u007D to update the
        "validations" signal, thus we also pass a <code>
          {" "}
          validations{" "}
        </code>{" "}
        props. The validation function is passed to the input component via the{" "}
        <code> isInvalid </code> prop.
      </details>
      <p>
        {" "}
        The input component contains an <code> ErrorOutput </code> cell. You can
        exploit both the browser validations (via CSS) and your own validations.
        The browser validation highlights the input border in red via the
        pseudo-class. The computed validation disables the SUBMIT button,
        returns a message displayed in the ErrorOutput box, and highlights the
        input border.
      </p>
      <Button fullWidth primary raised onClick={openDialog}>
        Open Login form
      </Button>
      <Dialog ref={diag} id="formModal" optCss={dialogCSS}>
        <ContentDiv>
          <header class="header">
            <h1>Credentials</h1>
          </header>
          <form class="main" id="form-ex" onSubmit={handleSubmit} ref={formEx}>
            <CustomInput
              svg={personSVG}
              alt="personSVG"
              required
              type="text"
              label="name"
              id="name"
              pattern="^(\w+){4,}"
              entry={name()}
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
              id="email"
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
              <CustomInput
                svg={keySVG}
                alt="keySVG"
                required
                ref={passwordInput}
                id="password"
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
                id="passwordConf"
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
                  onChange={(e) => {
                    revealPassword(e, passwordConfInput);
                    setPwdConfCheckbox((v) => !v);
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
