import { css } from "solid-styled-components";

export default (context) => {
  const {
    colors: { red, teal, orange, blue },
    codes: { warning, info, success, closed },
  } = context;

  const severityMap = {
    error: { icon: warning, color: red },
    warning: { icon: warning, color: orange },
    success: { icon: success, color: teal },
    info: { icon: info, color: blue },
  };

  const CloseIcon = ({ onClick }) => (
    <span
      class={css`
        cursor: pointer;
        margin: 0;
      `}
      onClick={onClick}
    >
      {closed}
    </span>
  );

  const toCss = (color) =>
    `border-left: 8px solid ${color[700]}; 
    color: ${color[700]}; 
    background-color: ${color[50]};
    `;

  const rootStyle = `
    display: flex; 
    max-width: 600px; 
    justify-content: flex-start; 
    align-items: stretch; 
    margin: 0.5rem; 
    font-weight: 500;
    `;

  const severityToStyle = ({ severity, message }) => {
    const style = severityMap[severity];
    if (!style) {
      throw Error(`invalid severity: '${severity}', message: ${message}`);
    }
    return style;
  };

  const Alert = ({
    name,
    severity,
    message,
    details,
    code,
    onRemove,
    ...other
  }) => {
    const style = severityToStyle({ severity, message });
    return (
      <div
        class={css`
          ${rootStyle} + ${toCss(style.color)}
        `}
        {...other}
        role="alert"
      >
        <div
          class={css`
            padding: 0 1.5rem;
            font-size: 3rem;
            background-color: ${style.color[100]};
            min-height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div>{style.icon}</div>
        </div>
        <div
          class={css`
            padding: 0 1rem;
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-around;
          `}
        >
          {name && (
            <h3>
              {name} {code && `(${code})`}
            </h3>
          )}
          <h4>{message}</h4>
          <pre>{details}</pre>
        </div>
        <div
          class={css`
            padding: 0 1.5rem;
            font-size: 3rem;
            min-height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          {onRemove && <CloseIcon onClick={onRemove} />}
        </div>
      </div>
    );
  };
  return Alert;
};
