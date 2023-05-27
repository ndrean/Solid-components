import { For, createSignal, lazy, onCleanup, onMount } from "solid-js";
import { styled } from "solid-styled-components";

import imgSVG from "../components/imgSVG";
import drawEmoji from "../components/drawEmoji.jsx";
import drawCodePoint from "../components/drawCodePoint.jsx";
import Link from "../components/Link";
import { gitHubSVG, tickSVG, hamburgerSVG } from "../components/svgs";
import Unicode from "../components/Unicode";
import { dynTitle } from "../components/title";

import ham from "../assets/ham.svg";
import cheers from "../assets/cheers.svg";

const Pre = styled("pre")`
  margin-left: 5px;
  padding: 5px;
  background-color: aliceblue;
`;

export default (context) => {
  const {
    codes: { check },
  } = context;

  const H2 = dynTitle("h2");
  const CodePoint = drawCodePoint();
  const Emoji = drawEmoji();
  const ImgSVG = imgSVG();

  const Tick = tickSVG(context);
  const Github = gitHubSVG(context);
  const Hamburger = hamburgerSVG(context);

  const [size, setSize] = createSignal(20);
  let interval;
  onMount(
    () => (interval = setInterval(() => setSize((s) => (s + 1) % 200), 10))
  );
  onCleanup(() => clearInterval(interval));

  return () => (
    <section id="dynamic.examples">
      <H2>Dynamic component</H2>
      <p>
        An illustration of Dynamic components and why not to destructure props
        in a component. We render a static emoji:
      </p>

      <br />
      <Emoji name="hamburger" label="🍔" />

      <br />
      <details>
        <summary>
          Click me to see a dynamic emoji, taken from the{" "}
          <Link
            href="https://www.solidjs.com/tutorial/bindings_style?solved"
            target="#"
          >
            documentation
          </Link>
          .
        </summary>
        <Emoji size={size()} name="surfer">
          🏄
        </Emoji>
      </details>
      <p>
        ❗ In the animation above, you change the size of component with a
        function (located in this page). If you want it to be reactive, you
        should not do as below:
      </p>
      <Pre>
        <code> const \u007Bsize = 48\u007D = props </code>
        <br />
        <code>style= \u007B\u007B "font-size=size+"px"\u007D\u007D</code>
      </Pre>
      <p>
        Instead define a function:
        <Pre>
          <code> const size = ()=&gt props.size || 48 </code>
          <br />
          <code> style=\u007B\u007B"font-size"=size()+"px"\u007D\u007D"</code>.
        </Pre>
      </p>
      <h2>Some SVGs as images</h2>
      <p>
        You save the SVG source in a file and pass its path reference into an
        Img SRC. You can only resize them.
      </p>
      <p>Sources: https://www.svgrepo.com, https://solid-icons.vercel.app/ </p>
      <p> \u003C ImgSVG src=\u007Bcheers\u007D alt="cheers" /\u003E</p>
      <p>
        <ImgSVG src={cheers} alt="cheers" />
      </p>

      <p>
        <ImgSVG src={ham} width={50} alt="ham" />
      </p>

      <h2>Some in-line SVGs:</h2>
      <p>
        You bring the SVG code into the composant. It can be preferable to use
        this when you want to change some properties of the SVG.
      </p>
      <p>
        <Hamburger color="orange" size={40} />
        <br />
        <Hamburger color="midnightblue" size={40} />
      </p>
      <p>\u003C Tick size={50} color1="bisque" color2="midnightblue" /\u003E</p>

      <Tick size={50} color1="bisque" color2="midnightblue" />
      <p>\u003C Tick size={50} color2="bisque" color1="midnightblue" /\u003E</p>
      <Tick size={50} color2="bisque" color1="midnightblue" />

      <p>\u003C Github size=\u007B30\u007D color="green" /\u003E</p>
      <p>
        <Github size={30} color="green" />
      </p>

      <br />

      <H2>A codepoint:</H2>
      <p>\u003C CodePoint codePoint="0x26543" size=\u007B96\u007D/\u003E</p>
      <CodePoint codePoint="0x2654" size={96} />

      <H2>Unicodes: </H2>
      <p>\u003C Unicode size="2em" code= u274C /\u003E </p>

      <For each={["\u274C", "\u274E", "\u2757", "\u2713", check]}>
        {(unicode) => (
          <span style={{ margin: "12px" }}>
            <Unicode size="2em" code={unicode} />
          </span>
        )}
      </For>
      <Unicode size="2em" code={"\u007B"} />
    </section>
  );
};
