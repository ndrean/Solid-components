import { css } from "solid-styled-components";

export default (context) => {
  const {
    theme: { palette },
    shadows,
  } = context;

  return function Modal(props) {
    // { open, onClose, children } = props
    const style = {
      base: css`
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        z-index: 2;
        height: 100vh;
        width: 100vw;
        visibility: ${props.open ? "visible" : "hidden"};
      `,
      overlay: css`
        position: absolute;
        z-index: ${props.open ? 1 : -1};
        opacity: ${props.open ? 0.8 : 0};
        background-color: ${palette.primary.main};
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: opacity 0.3s ease-out;
      `,
      modal: css`
        z-index: 2;
        box-shadow: ${shadows[10]};
        background-color: ${background.default};
        top: 0;
        left: 0;
        max-height: 90vh;
        max-width: 95vw;
        transition: transform 0.3s ease-out;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-content: space-between;
        min-width: 400px;
      `,
      header: css`
        padding: 1rem;
        font-size: 1.8rem;
        font-weight: 800;
        text-align: center;
        background-color: ${palette.primary.main};
        color: ${palette.primary.contrastText};
      `,
      footer: css`
        display: flex;
        justify-content: flex-end;
        margin: 0px;
        box-shadow: ${shadows[2]};
        > * {
          margin: 12px;
        }
      `,
      main: css`
        flex-grow: 1;
        overflow: scroll;
      `,
    };

    return (
      <div class={style.base}>
        <div class={style.overlay} onClick={() => onClose()} />
        <div class={style.modal}>{children}</div>
      </div>
    );
  };
};
