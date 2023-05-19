import { css } from "solid-styled-components";

export default (context) => {
  const {
    colors: { grey },
    shadows,
  } = context;

  //   DO NOT DESTRUCTURE THE PROPS !!!
  return function Drawer(props) {
    const style = (open) => ({
      base: `
        position: fixed;
        top: 80px;
        left: 0px;
        z-index: 2;
      `,
      overlay: `
        position: absolute;
        z-index: ${open ? 1 : -1};
        opacity: ${open ? 0.5 : 0};
        background-color: ${grey};
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: opacity 0.3s ease-out;
      `,
      content: `
        transform: translate(${open ? "0%" : "-100%"}, 0px);
        z-index: 2;
        position: absolute;
        box-shadow: ${shadows[1]};
        background-color: ${grey[100]};
        top: 0;
        left: 0;
        transition: transform 0.3s ease-out;
        `,
    });

    return (
      <div
        class={css`
          ${style(props.open).base}
        `}
      >
        <div
          class={css`
            ${style(props.open).overlay}
          `}
          onClick={props.onClose()}
        />
        <div
          class={css`
            ${style(props.open).content}
          `}
        >
          {props.children}
        </div>
      </div>
    );
  };
};
