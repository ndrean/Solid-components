import { createSignal, For, createMemo } from "solid-js";
import { styled, css } from "solid-styled-components";

import { dynTitle } from "../components/title";
import button from "../components/button";
import grayDiv from "../components/grayDiv";
import { tickSVG } from "../components/svgs";

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
  const {
    classes: { stdTitle },
  } = context;

  const [options, keys] = createMemo(() => buildList())();
  const [selected, setSelected] = createSignal(null);
  const [optionList, setOptionList] = createSignal(options);
  const [keyList, setKeyList] = createSignal(keys);

  // const HRLine = title(context.classes.hrLine);
  const GrayDiv = grayDiv(context);
  const Title = dynTitle(stdTitle, "h1");
  const H3 = dynTitle("", "h3");
  const Button = button(context);
  const Tick = tickSVG("bisque", "4em");

  return (
    <section id="select.examples">
      <Title>Selection</Title>
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
      <H3>
        A simple <code> SELECT </code> example
      </H3>
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
          <option selected disabled>
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
      <H3>
        An <code> AUTOCOMPLETE </code> example with <code> DATALIST </code>
      </H3>
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
      <br />
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
            placeholder="type in..."
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
    </section>
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
