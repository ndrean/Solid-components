import { styled, css } from "solid-styled-components";
import { createSignal } from "solid-js";
import checkbox from "../components/checkbox";
import { tClass } from "../components/title";

export default (context) => {
  const { tr, customCss } = context;
  const Title = tClass(customCss);
  const Checkbox = checkbox(context);

  const [state, setState] = createSignal({});
  const [group, setGroup] = createSignal(undefined);

  const CheckboxContainer = styled("div")`
    display: flex;
    align-items: center;
    label {
      margin-left: 1rem;
    }
  `;

  return function CheckBoxExamples() {
    return (
      <section id="checkbox">
        <Title css={customCss}>{tr.t("Checkbox")}</Title>
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
        <p>My checkbox is: {state()["myCheckbox"] ? "true" : "false"}</p>
        <p>Autoplay is: {state()["autoplay"] ? "true" : "false"}</p>

        <Title css={customCss}>{tr.t("Grouped checkboxes")}</Title>
        <form
          class={css`
            > div {
              margin: 10px;
            }
          `}
        >
          <CheckboxContainer>
            <Checkbox
              type="radio"
              name="group"
              value="option-1"
              id="1"
              onChange={(evt) => {
                setGroup(evt.target.value);
              }}
            >
              Option 1
            </Checkbox>
            <label for="1">Radio 1</label>
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              type="radio"
              name="group"
              id="2"
              value="option-2"
              onChange={(evt) => {
                setGroup(evt.target.value);
              }}
            >
              Option 2
            </Checkbox>
            <label for="2">Radio 2</label>
          </CheckboxContainer>
        </form>
        <p>Your selected: {group()}</p>
      </section>
    );
  };
};
