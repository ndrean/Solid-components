import { createSignal, For, createMemo } from "solid-js";
import { styled } from "solid-styled-components";

import title from "./title";
import GrayDiv from "../components/GrayDiv";

const Span = styled("span")`
  padding-left: 20px;
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

const buildList = () => {
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
};

export default (context) => (props) => {
  const [options, keys] = createMemo(() => buildList())();
  // const data = createMemo(() => buildList());
  // const [options, keys, values] = data();
  const [optionList, setOptionList] = createSignal(options);
  const [keyList, setKeyList] = createSignal(keys);
  const [selected2, setSelected2] = createSignal(null);
  const [selected, setSelected] = createSignal(null);
  const HRLine = title(context.classes.hrLine);
  const Title = title();

  return (
    <>
      <Title>
        A simple <code> SELECT </code> example
      </Title>
      <p>
        We vave a list of countries and want to render a <code> SELECT </code>{" "}
        list.
      </p>
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

      <p>
        Note: the <code> createSignal </code> hook is placed outside of the
        component function body to keep the state during navigation (file
        "select.jsx")
      </p>
      <form>
        <label for="country" style={{ "padding-right": "10px" }}>
          Choose a country:
        </label>
        <select
          id="country"
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
      <p>
        One key point is to set the <code> LIST </code> attribute on the input
        equal to the <code> ID </code>
        of the <code> DATALIST </code>. Then you need to create several signals,
        one for the list of options who will be updated dynamically on each
        input (<code> onInput </code> with SolidJS), and one for the selection
        (if you want to submit the input).
      </p>
      <form
        autocomplete="off"
        id="autocomp"
        onSubmit={(e) => {
          e.preventDefault();
          setSelected2(Object.keys(optionList())[0]);
        }}
      >
        <label for="choice">Type a few letters: </label>
        <input
          list="countries"
          id="choice"
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
        <button form="autocomp" type="submit">
          Submit
        </button>
      </form>
      <br />
      <GrayDiv>
        <output>{options[selected2()]}</output>
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
