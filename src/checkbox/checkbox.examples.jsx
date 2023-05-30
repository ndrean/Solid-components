import { styled, css } from "solid-styled-components";
import { For, createSignal } from "solid-js";
import checkbox from "./checkbox";
import { dTitle } from "../app/title";
import grayDiv from "../app/grayDiv";

export default (context) => {
  const {
    tr,
    classes: { stdTitle },
    theme: {
      shadows,
      palette: { primary, secondary },
    },
    codes: { tick },
  } = context;

  // <-- Styling for this page
  const Title = dTitle("h1", stdTitle);
  const GrayDiv = grayDiv(context);

  const Span = styled("span")`
    padding-right: 15px;
  `;

  const Fieldset = styled("fieldset")`
    border-color: ${primary.border};
    margin-right: 20px;
    box-shadow: ${shadows[2]};
  `;

  const Legend = styled("legend")`
    background-color: ${secondary.background};
    color: primary.text;
    padding: 5px;
    border-radius: 5px;
  `;
  // --> end styling page

  return function CheckBoxExamples() {
    const Checkbox = checkbox(context);
    const [state, setState] = createSignal({});
    const [radioGroup, setRadioGroup] = createSignal({});

    function handleCheckbox(evt) {
      setState({ ...state(), [evt.target.name]: evt.target.checked });
    }

    function handleRadioGroup(evt) {
      setRadioGroup({
        ...radioGroup(),
        [evt.target.name]: evt.target.value,
      });
    }

    return (
      <section id="checkbox">
        <Title>{tr.t("Checkbox")}</Title>
        <p>
          The <code> CHECKBOX </code> component can be resized with a{" "}
          <code> size </code> prop. You can also change the content of the
          checkbox with a <code> content </code> prop. The content is a UNICODE
          defined in the <code> CONTEXT </code> object.
        </p>
        <form
          class={css`
            > div {
              margin: 10px;
            }
          `}
        >
          <Checkbox
            id="My Checkbox"
            name="myCheckbox"
            label="My Checkbox"
            value="My Checkbox"
            onChange={handleCheckbox}
          />
          <Checkbox
            id="Autoplay"
            name="autoplay"
            label="Autoplay"
            value="Autoplay"
            onChange={handleCheckbox}
            size={1.2}
            content={tick}
          />
          <Checkbox disabled id="disabled" name="disabled" label="Disabled" />
        </form>
        <br />
        <GrayDiv>
          <p>My checkbox is: {state()["myCheckbox"] ? "true" : "false"}</p>
          <p>Autoplay is: {state()["autoplay"] ? "true" : "false"}</p>
        </GrayDiv>

        <Title>{tr.t("Groups of radio buttons")}</Title>
        <p>Overwrite the type with "radio" as the default is "checkbox".</p>
        <form
          class={css`
            > div {
              margin: 10px;
            }
          `}
        >
          <div style={{ display: "flex" }}>
            <Fieldset style={{ borderColor: "bisque" }} id="group1">
              <Legend>IAC tools</Legend>
              <Checkbox
                type="radio"
                id="GruCloud"
                name="group1"
                label="GruCloud"
                value="GruCloud"
                onChange={handleRadioGroup}
              />
              <Checkbox
                type="radio"
                id="Terraform"
                name="group1"
                label="Terraform"
                value="Terraform"
                onChange={handleRadioGroup}
              />
              <Checkbox
                type="radio"
                id="Pulumi"
                name="group1"
                label="Pulumi"
                value="Pulumi"
                onChange={handleRadioGroup}
              />
            </Fieldset>
            <Fieldset id="group2">
              <Legend>Language</Legend>
              <Checkbox
                type="radio"
                id="Rust"
                name="group2"
                content={tick}
                value="Rust"
                label="Rust"
                onChange={handleRadioGroup}
              />
              <Checkbox
                type="radio"
                id="NodeJS"
                name="group2"
                label="NodeJS"
                value="NodeJS"
                content={tick}
                onChange={handleRadioGroup}
              />
            </Fieldset>
          </div>
          <br />
          <p>
            <GrayDiv>
              <Span>You selected: </Span>
              <For each={Object.values(radioGroup())}>
                {(val) => <Span>{val},</Span>}
              </For>
            </GrayDiv>
          </p>
        </form>
      </section>
    );
  };
};
