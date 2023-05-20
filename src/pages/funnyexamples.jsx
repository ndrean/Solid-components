import { For } from "solid-js";
import cheers from "../assets/cheers.svg";
import ham from "../assets/ham.svg";
import imgSVG from "../components/imgSVG";
import drawEmoji from "../components/drawEmoji.jsx";
import drawCodePoint from "../components/drawCodePoint.jsx";

const gitHub = (width) => (
  <svg
    fill="currentColor"
    stroke-width="0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={width}
    width={width}
    style="overflow: visible;"
  >
    <path
      fill-rule="evenodd"
      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
      clip-rule="evenodd"
    ></path>
  </svg>
);
const hamburger = (color, width) => (
  <svg
    id="burger-icon"
    version="1.1"
    viewBox="0 0 32 32"
    width={width}
    height={width}
  >
    <path
      fill={color}
      d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
    />
  </svg>
);

const Burger = () => hamburger("orange", "40");
const Github = () => gitHub(40);

export default () => {
  const CodePoint = () => drawCodePoint("0x2654", 96);
  const Emoji = () => drawEmoji("🍔", 56, "hamburger");
  const Ham = () => imgSVG(ham, 50, "ham");
  const Cheers = () => imgSVG(cheers, 56, "cheers");

  return (
    <>
      <p>
        Set the <code>font-size</code> or <code>width</code>:
      </p>
      <p>An emoji:</p>
      <Emoji />
      <h2>Some SVGs:</h2>
      <p>
        An image: <Cheers />
      </p>
      <p>
        Another (source: https://www.svgrepo.com): <Ham />
      </p>

      <h2>Inline SVGs:</h2>
      <p>
        <Burger />
      </p>
      <p> (Source: https://solid-icons.vercel.app/) </p>
      <p>
        <Github />
      </p>

      <br />

      <h2>A codepoint:</h2>
      <CodePoint />
      <h2>Unicodes: </h2>
      <For each={["\u274C", "\u274E", "\u2757", "\u2713"]}>
        {(unicode) => (
          <span style={{ fontSize: "12px", margin: "12px" }}>{unicode}</span>
        )}
      </For>
    </>
  );
};

export { Burger };
