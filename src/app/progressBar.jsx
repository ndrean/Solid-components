import { styled } from "solid-styled-components";
import { createSignal } from "solid-js";

const progressBar = (args) => (props) => {
  const { max = 500 } = args;
  const [meter, setMeter] = createSignal(0);
  setInterval(() => setMeter((v) => (v + 1) % max, 50));
  const width = props.width || "50%";
  const height = props.height || "10px";

  const Progres = styled("progress")`
    width: ${width};
    height: ${height};
  `;

  return <Progres max={max} value={meter()} {...props} />;
};

export default progressBar;
