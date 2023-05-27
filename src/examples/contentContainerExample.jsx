import { styled } from "solid-styled-components";

export default (context) => {
  const {
    theme: { shadows, palette },
  } = context;

  const ContentContainer = styled("div")`
    box-shadow: ${shadows[10]};
    background-color: #f1f1f1;
    top: 0;
    left: 0;
    max-height: 50vh;
    max-width: 75vw;
    ${"" /* overflow-y: scroll; */}
    overflow-x: scroll;
    transition: transform 0.3s ease-out;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: space-between;

    .header {
      padding: 1rem;
      font-size: 1.8rem;
      font-weight: 800;
      text-align: center;
      background-color: ${palette.primary.text};
      color: ${palette.secondary.background};
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
  return () => <ContentContainer />;
};
