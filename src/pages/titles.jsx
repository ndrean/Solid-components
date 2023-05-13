import { styled, css } from "solid-styled-components";
import TitleExamples from "../components/title.examples.jsx";

const styles = {
  root: `
    color: red;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 0.5rem;
    min-width: 4rem;
    min-height: 2.5rem;
    outline: none;
    border: none;
    ::before {
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: calc(50% - 100%);
      left: calc(50% - 100%);
      width: 200%;
      height: 200%;
      transition: opacity 250ms linear;
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
      content: "";
    };
    :active {
      ::before {
        opacity: 1;
      }
    };
    :hover {
      ::before {
        opacity: 0.5;
      }
    };
  `,
};

const Button = styled("button")`
  ${styles.root}
`;
export default function Titles() {
  return (
    <>
      <TitleExamples />
      <form
        onClick={(e) => {
          e.preventDefault();
          console.log(e.currentTarget);
        }}
      >
        <Button>buttonnn</Button>
      </form>
    </>
  );
}
