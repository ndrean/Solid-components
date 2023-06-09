import { css, styled } from "solid-styled-components";

export default (context) => {
  const {
    shadows,
    theme: { bg },
  } = context;

  const base = (open) => css`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100vh;
    width: 100vw;
    visibility: ${open ? "visible" : "hidden"};
  `;

  const overlay = (open) => css`
    position: absolute;
    z-index: ${open ? 1 : -1};
    opacity: ${open ? 0.8 : 0};
    background-color: white;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: opacity 0.3s ease-out;
  `;

  const ModalClass = styled("div")`
    z-index: 2;
    box-shadow: ${shadows[10]};
    background-color: ${bg.lightGrey};
    top: 0;
    left: 0;
    max-height: 50vh;
    max-width: 75vw;
    overflow-y: scroll;
    transition: transform 0.3s ease-out;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    min-width: 90%;

    .header {
      padding: 1rem;
      font-size: 1.8rem;
      font-weight: 800;
      text-align: center;
      background-color: midnightblue;
      color: bisque;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      margin: 0px;
      box-shadow: ${shadows[2]};
      > * {
        margin: 10px;
      }
    }
    .main {
      flex-grow: 1;
      overflow: scroll;
      padding: 10px;
    }
  `;

  return (props) => {
    return (
      <div class={base(props.open)}>
        <div
          class={overlay(props.open)}
          onClick={() => {
            // console.log("click away on overlay");
            props.onClose();
          }}
        />
        <ModalClass>{props.children}</ModalClass>
      </div>
    );
  };
};
