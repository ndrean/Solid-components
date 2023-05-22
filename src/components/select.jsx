import { createSignal, For } from "solid-js";
import { styled } from "solid-styled-components";

const Span = styled("span")`
  padding-left: 20px;
`;
const UK = () => (
  <div>
    UK<Span>🇬🇧</Span>
  </div>
);
const FR = () => (
  <div>
    FR<Span>🇫🇷 </Span>
  </div>
);

const options = {
  uk: UK,
  fr: FR,
};

const [selected, setSelected] = createSignal(null);

export default (context) => (props) => {
  return (
    <>
      <p>
        The <code> createSignal </code> hook is placed outside of the component
        function body to keep the state during navigation (file "select.jsx")
      </p>
      <label for="country" style={{ "padding-right": "10px" }}>
        Choose a country:{" "}
      </label>
      <select
        id="country"
        value={selected()}
        onInput={(e) => {
          setSelected(e.currentTarget.value);
          console.log(selected());
        }}
      >
        <option value="null" selected disabled>
          Select a country
        </option>
        <For each={Object.keys(options)}>
          {(country) => <option value={country}>{options[country]}</option>}
        </For>
      </select>
      <Switch fallback={<p>nada is not a country...</p>}>
        <Match when={selected() === "uk"}>
          <UK />
        </Match>
        <Match when={selected() === "fr"}>
          <FR />
        </Match>
      </Switch>
    </>
  );
};
