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
    codes: { cross, tick },
  } = context;

  const Title = dTitle("h1", stdTitle);
  const Checkbox = checkbox(context);
  const GrayDiv = grayDiv(context);

  const [state, setState] = createSignal({});
  const [radioGroup, setRadioGroup] = createSignal({});

  const CheckboxContainer = styled("div")`
    display: flex;
    align-items: center;
    label {
      margin-left: 1rem;
    }
  `;

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

  return function CheckBoxExamples() {
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
          <CheckboxContainer>
            <Checkbox
              id="myCheckbox"
              name="myCheckbox"
              value={state().myCheckbox || false}
              onChange={(evt) => {
                setState({
                  ...state(),
                  [evt.target.name]: evt.target.checked,
                });
              }}
            />
            <label for="myCheckbox">My Checkbox</label>
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              id="autoplay"
              name="autoplay"
              size={1.5}
              content={tick}
              value={state()["autoplay"] || false}
              onChange={(evt) => {
                setState({
                  ...state(),
                  [evt.target.name]: evt.target.checked,
                });
              }}
            />
            <label for="autoplay">Autoplay</label>
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox id="disabled" disabled name="myCheckbox" />
            <label for="disabled">Disabled</label>
          </CheckboxContainer>
        </form>
        <GrayDiv>
          <p>My checkbox is: {state()["myCheckbox"] ? "true" : "false"}</p>
          <p>Autoplay is: {state()["autoplay"] ? "true" : "false"}</p>
        </GrayDiv>

        <Title>{tr.t("Groups of radio buttons")}</Title>
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
              <CheckboxContainer>
                <Checkbox
                  type="radio"
                  name="group1"
                  value={"GruCloud"}
                  id="grucloud"
                  onChange={handleRadioGroup}
                />
                <label for="grucloud">GruCloud</label>
              </CheckboxContainer>
              <CheckboxContainer>
                <Checkbox
                  type="radio"
                  name="group1"
                  id="terraform"
                  value={"Terraform"}
                  onChange={handleRadioGroup}
                />
                <label for="terraform">Terraform</label>
              </CheckboxContainer>
              <CheckboxContainer>
                <Checkbox
                  type="radio"
                  name="group1"
                  id="pulumi"
                  value={"Pulumi"}
                  onChange={handleRadioGroup}
                />
                <label for="pulumi">Pulumi</label>
              </CheckboxContainer>
            </Fieldset>
            <Fieldset id="group2">
              <Legend>Language</Legend>
              <CheckboxContainer>
                <Checkbox
                  type="radio"
                  name="group2"
                  value={"Rust"}
                  content={tick}
                  id="rust"
                  onChange={handleRadioGroup}
                />
                <label for="rust">Rust</label>
              </CheckboxContainer>
              <CheckboxContainer>
                <Checkbox
                  type="radio"
                  name="group2"
                  id="nodejs"
                  value={"NodeJS"}
                  content={tick}
                  onChange={handleRadioGroup}
                />
                <label for="nodejs">NodeJS</label>
              </CheckboxContainer>
            </Fieldset>
          </div>
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
