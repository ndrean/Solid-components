import fbIcon from "../icons/facebook.svg";
import funnyExamples from "../examples/funny.examples";

const examples = [
  { src: fbIcon, width: 40 },
  { emoji: "🍔", width: 20 },
  { codePoint: 0x2654, width: 20 },
];

const FunnyExamples = funnyExamples(examples);

export default () => (
  <>
    <p>An SVG:</p>
    <FunnyExamples />
  </>
);
