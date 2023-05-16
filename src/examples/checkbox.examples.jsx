import { styled, css } from "solid-styled-components";
import { createSignal, createEffect } from "solid-js";
import checkbox from "../components/checkbox";
import { BaseH1Props } from "../components/title";

const customCss2 = `
  border: none; 
  text-align: left;
  padding-left: 12px;
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, .2);
  `;

const Title = BaseH1Props();

export default (context) => {
  const { tr } = context;
  const Checkbox = checkbox(context);

  const initMap = new Map().set("myCheckbox", false);
  const [map, setMap] = createSignal(initMap);

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
        <Title css={customCss2}>{tr.t("Checkbox")}</Title>
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
              value={map().get("myCheckbox") || false}
              onChange={(evt) => {
                setMap((m) => m.set(evt.target.name, evt.target.checked));
              }}
            />
            <label for="myCheckbox">My Checkbox</label>
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              id="autoplay"
              name="autoplay"
              value={map().get("myCheckbox") || ""}
              onChange={(evt) => {
                setMap((m) => m.set(evt.target.name, evt.target.checked));
              }}
            />
            <label for="autoplay">Autoplay</label>
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              id="disabled"
              disabled
              name="myCheckbox"
              //   value={map().get("myCheckbox") || ""}
              //   onChange={(evt) => {
              //     setMap((m) => m.set(evt.target.name, evt.target.checked));
              //   }}
            />
            <label for="disabled">Disabled</label>
          </CheckboxContainer>
        </form>
      </section>
    );
  };
};
