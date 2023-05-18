import { For } from "solid-js";
import fbIcon from "../assets/facebook.svg";
import imgSVG from "../components/imgSVG";
import drawEmoji from "../components/drawEmoji.jsx";
import drawCodePoint from "../components/drawCodePoint.jsx";

const hamburger = (color) => (
  <svg
    id="burger-icon"
    version="1.1"
    viewBox="0 0 32 32"
    width="40px"
    height="50px"
  >
    <path
      fill={color}
      d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
    />
  </svg>
);

const Burger = () => hamburger("orange");

export default () => {
  const CodePoint = () => drawCodePoint("0x2654", 96);
  const Emoji = () => drawEmoji("🍔", 56, "hamburger");
  const FbIcon = () => imgSVG(fbIcon, 56, "facebook");

  return (
    <>
      <p>
        Set the <code>font-size</code> or <code>width</code>:
      </p>
      <p>An emoji:</p>
      <Emoji />
      <p>Some SVGs:</p>
      <FbIcon />
      <br />
      <Burger />
      <p>A codepoint:</p>
      <CodePoint />
      <p>Unicodes: </p>
      <For each={["\u274C", "\u274E", "\u2757", "\u2713"]}>
        {(unicode) => (
          <span style={{ fontSize: "12px", margin: "12px" }}>{unicode}</span>
        )}
      </For>
    </>
  );
};

export { Burger };
