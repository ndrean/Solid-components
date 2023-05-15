import { For } from "solid-js";
import iconSVG from "../components/iconSVG";
import drawEmoji from "../components/drawEmoji.jsx";
import drawCodePoint from "../components/drawCodePoint.jsx";

export default (examples) => {
  return (
    <For each={examples}>
      {({ width, src, emoji, codePoint }) =>
        emoji
          ? drawEmoji(emoji)
          : codePoint
          ? drawCodePoint(codePoint)
          : src
          ? iconSVG(src, width)
          : null
      }
    </For>
  );
};
