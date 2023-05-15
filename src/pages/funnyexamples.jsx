import fbIcon from "../icons/facebook.svg";
import iconSVG from "../components/iconSVG";
import drawEmoji from "../components/drawEmoji.jsx";
import drawCodePoint from "../components/drawCodePoint.jsx";

export default () => {
  const CodePoint = () => drawCodePoint("0x2654");
  const Emoji = () => drawEmoji("🍔", 20);
  const FbIcon = () => iconSVG(fbIcon, 48);
  return (
    <>
      <p>An SVG:</p>
      <Emoji />
      <p>An SVG:</p>
      <FbIcon />
      <p>A codepoint:</p>
      <CodePoint />
    </>
  );
};
