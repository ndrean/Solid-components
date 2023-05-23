import { For, createSignal } from "solid-js";

import cheers from "../assets/cheers.svg";
import ham from "../assets/ham.svg";
import imgSVG from "../components/imgSVG";
import drawEmoji from "../components/drawEmoji.jsx";
import drawCodePoint from "../components/drawCodePoint.jsx";
import Link from "../components/Link";
import github from "../components/github";
import hamburger from "../components/hamburger";
import tick from "../components/tick";
// import progres from "../components/Progres";
const Burger = hamburger("orange", "40");
export { Burger };

export default () => {
  const Github = github(40);
  const CodePoint = drawCodePoint("0x2654", 96);
  const Emoji = drawEmoji("🍔", 50, "hamburger");
  const Ham = imgSVG(ham, 50, "ham");
  const Cheers = imgSVG(cheers, 56, "cheers");
  const Tick = tick("bisque");
  // const Progres = progres({ width: "100vw", height: "10px" });

  const [size, setSize] = createSignal(20);
  setInterval(() => setSize((s) => (s + 1) % 60), 50);
  // createEffect(() => console.log(size()));
  return (
    <>
      <p>An emoji:</p>
      <Emoji />
      <br />
      <details>
        <summary>
          Click me to see an{" "}
          <Link
            href="https://www.solidjs.com/tutorial/bindings_style?solved"
            target="#"
          >
            animated
          </Link>{" "}
          emoji:
        </summary>
        <span
          style={{ "font-size": `${size()}px` }}
          role="img"
          aria-label="burger"
        >
          🍔
        </span>
      </details>
      <h2>Some SVGs:</h2>
      <p>Sources: https://www.svgrepo.com, https://solid-icons.vercel.app/ </p>
      <p>
        An image: <Cheers />
      </p>

      <p>
        Another (source: ): <Ham />
      </p>

      <h2>Inline SVGs:</h2>
      <p>
        <Burger />
      </p>
      <p>
        <Tick />
      </p>
      <p>
        <Github />
      </p>

      <br />

      <h2>A codepoint:</h2>
      <CodePoint />
      <h2>Unicodes: </h2>
      <For each={["\u274C", "\u274E", "\u2757", "\u2713", "\u2705"]}>
        {(unicode) => (
          <span style={{ fontSize: "12px", margin: "12px" }}>{unicode}</span>
        )}
      </For>
    </>
  );
};
