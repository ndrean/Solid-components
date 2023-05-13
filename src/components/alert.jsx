import { css, styled } from "solid-styled-components";

export default ({ colors }) => {
  const { red, teal, orange, blue } = colors;

  const severityMap = {
    error: { icon: "\u26A0", color: red },
    warning: { icon: "\u26A0", color: orange },
    success: { icon: "\u2714", color: teal },
    info: { icon: "\u2139", color: blue },
  };

  const CloseIcon = ({ onClick }) => (
    <span
      css={{
        cursor: "pointer",
        margin: 0,
      }}
      onClick={onClick}
    >
      {"\u2716"}
    </span>
  );

  const toCss = (color) =>
    `border-left: 8px solid ${color}; 
    color: hsl(0,100%, 35%); 
    background-color: ${color};
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
            background-color: ${style.color};
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
