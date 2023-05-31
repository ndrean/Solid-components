import { styled } from "solid-styled-components";
import { spinCircle } from "../../spinner/loaders";

export default function loading(context) {
  const CenterSpin = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  `;

  const Spin = spinCircle(context);
  return (
    <CenterSpin>
      <Spin />
    </CenterSpin>
  );
}
