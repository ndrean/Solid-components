import { A } from "@solidjs/router";
import { css } from "solid-styled-components";
import routes from "../routes";

export default ({ theme }) =>
  (props) => {
    const { bg, text } = theme;
    const bgBisque = css`
      background-color: ${bg.bisque};
    `;

    const link = css`
      padding: 10px;
      margin: 5px 10px;
      display: inline-block;
      font-weight: bold;
      color: ${text[2]};
      text-decoration: none;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    `;

    return (
      <nav>
        <For each={routes}>
          {({ path, title }) =>
            !title.includes("PreFetch") && (
              <A
                href={path}
                class={link}
                end
                activeClass={bgBisque}
                onClick={props.navChange}
              >
                {title}
              </A>
            )
          }
        </For>
        <hr />
      </nav>
    );
  };
