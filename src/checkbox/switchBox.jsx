import { createEffect, createSignal } from "solid-js";
import { css } from "solid-styled-components";

export default ({ colors }) => {
  const style = ({ h }) => ({
    base: css`
      position: relative;
      display: flex;
      align-items: center;
      label {
        margin-left: 10px;
      }
      input {
        width: ${2 * h + "rem"};
        height: ${h + "rem"};
        background-color: bisque;
        border-radius: 5px;
        appearance: none;
        outline: none;
        transition: all 0.5s;
        box-shadow: 0 0 5px rgba(255, 0, 0, 0.2);
        &:after {
          content: "";
          background: #ffffff;
          transform: translateX(0%) scale(1.3);
          width: ${h + "rem"};
          height: ${h + "rem"};
          border-radius: 50%;
          position: absolute;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          background-color: ${colors.grey[700]};
          transition: all 0.5s;
        }
        &:checked {
          background-color: white;
        }
        &:checked:after {
          content: "";
          transform: translateX(100%) scale(1.3);
          background-color: midnightblue;
        }
      }
    `,
  });

  const [check, setCheck] = createSignal(false);
  const handleChange = () => setCheck((v) => !v);

  return (props) => {
    const { id, label, height = 2, ...otherProps } = props;

    return (
      <div class={style({ h: height }).base}>
        <input
          type="checkbox"
          id={id}
          {...otherProps}
          onChange={handleChange}
        />
        {label && (
          <label for={id}>
            {label}: &nbsp{check() ? "on" : "off"}
          </label>
        )}
      </div>
    );
  };
};
