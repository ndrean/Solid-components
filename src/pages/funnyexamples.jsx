import fbIcon from "../icons/facebook.svg";
import iconSVG from "../components/iconSVG";
import drawEmoji from "../components/drawEmoji.jsx";
import drawCodePoint from "../components/drawCodePoint.jsx";

export default () => {
  const CodePoint = () => drawCodePoint("0x2654", 96);
  const Emoji = () => drawEmoji("🍔", 56, "hamburger");
  const FbIcon = () => iconSVG(fbIcon, 56, "facebook");
  return (
    <>
      <p>
        Set the <code>font-size</code> or <code>width</code>:
      </p>
      <p>An emoji:</p>
      <Emoji />
      <p>An SVG:</p>
      <FbIcon />
      <p>A codepoint:</p>
      <CodePoint />
    </>
  );
};
