import { createSignal, For, createMemo } from "solid-js";
import { styled, css } from "solid-styled-components";

import title from "./title";
import button from "./button";
import GrayDiv from "../components/GrayDiv";
import tick from "./tick";

const Span = styled("span")`
  padding-left: 20px;
`;

const centerDiv = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const selectClass = css`
  width: 40%;
  height: 3em;
`;

const btnCss = css`
  border: none;
  display: inline-block;
  cursor: pointer;
  background: none;
  padding-left: 1%;
`;
const countries = {
  Estonia: "🇪🇪",
  "European Union": "🇪🇺",
  France: "🇫🇷",
  Finlande: "🇫🇮",
  Georgia: "🇬🇪",
  Germany: "🇩🇪",
  "United Kingdom": "🇬🇧",
  "United States": "🇺🇸",
};

const [selectedAuto, setSelectedAuto] = createSignal(null);

export default (context) => (props) => {
  const [selected, setSelected] = createSignal(null);
  const [options, keys] = createMemo(() => buildList())();
  // const data = createMemo(() => buildList());
  // const [options, keys, values] = data();
  const [optionList, setOptionList] = createSignal(options);
  const [keyList, setKeyList] = createSignal(keys);

  const HRLine = title(context.classes.hrLine);
  const Title = title();
  const Button = button(context);
  const Tick = tick("bisque", "4em");

  return (
    <>
      <details>
        <summary>
          We have a list of countries and want to render a <code> SELECT </code>{" "}
          list. Click to visit.
        </summary>
        <pre>
          <code>const countries = \u007B</code>
          <br />
          <code>&nbsp France: "🇫🇷",</code>
          <br />
          <code>&nbsp "United Kingdom": "🇬🇧",</code>
          <br />
          <code>&nbsp ...</code>
          <br />
          <code>\u007D</code>
        </pre>
      </details>
      <p>
        We use the <code> createSignal </code> hook. You can place it outside of
        the component function body to keep the state during navigation, or
        inside to get the state reset on every visit. The first selection is
        reset whilst not the second in the demo below.
      </p>
      <Title>
        A simple <code> SELECT </code> example
      </Title>
      <form>
        <label for="country" style={{ "padding-right": "10px" }}>
          Choose a country:
        </label>

        <select
          id="country"
          class={selectClass}
          value={selected()}
          onInput={(e) => setSelected(e.currentTarget.value)}
        >
          <option value="null" selected disabled>
            Select a country
          </option>
          <For each={keys}>
            {(country) => <option value={country}>{options[country]}</option>}
          </For>
        </select>
      </form>
      <br />
      <GrayDiv>
        <p>{selected()}</p>
        <p>{options[selected()]}</p>
      </GrayDiv>
      <br />
      <Title>
        An <code> AUTOCOMPLETE </code> example with <code> DATALIST </code>
      </Title>
      <details>
        <summary>
          Key points on <code> DATALIST </code>
        </summary>
        One key point is to set the <code> LIST </code> attribute on the input
        equal to the <code> ID </code>
        of the <code> DATALIST </code>. Then you need to create several signals,
        one for the list of options who will be updated dynamically on each
        input (<code> onInput </code> with SolidJS), and one for the selection
        (if you want to submit the input).
      </details>

      <form
        autocomplete="off"
        id="autocomp"
        onSubmit={(e) => {
          e.preventDefault();
          setSelectedAuto(Object.keys(optionList())[0]);
        }}
      >
        {/* <label for="choice">Type a few letters: </label> */}
        <div class={centerDiv}>
          <input
            list="countries"
            id="choice"
            class={selectClass}
            onInput={(e) => {
              setKeyList(updateKeyList(e.currentTarget.value, keys));
              setOptionList(updateOptionList(keyList(), options));
            }}
          />

          <datalist id="countries">
            <For each={keyList()}>
              {(country) => (
                <option value={country}>{optionList()[country]}</option>
              )}
            </For>
          </datalist>
          <Button>
            <Tick />
          </Button>
        </div>
      </form>
      <br />
      <GrayDiv>
        <output>{options[selectedAuto()]}</output>
      </GrayDiv>
      <br />
    </>
  );
};

function updateKeyList(input, keyList) {
  return keyList.filter((option) =>
    option.toLowerCase().includes(input.toLowerCase())
  );
}

function updateOptionList(keyList, optionList) {
  return keyList.reduce((acc, key) => ({ ...acc, [key]: optionList[key] }), {});
}

function buildList() {
  const options = {};
  for (const country in countries) {
    options[country] = () => (
      <div>
        {countries[country]}
        <Span>{country}</Span>
      </div>
    );
  }
  return [options, Object.keys(options)];
}
