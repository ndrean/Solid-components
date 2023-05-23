import { A } from "@solidjs/router";
import { css } from "solid-styled-components";
import "../index.css";
import routes from "../routes";

const display = css`
  display: block;
`;

export default (context) => (props) => {
  const {
    theme: { palette },
  } = context;

  const bgBisque = css`
    background-color: ${palette.secondary.background};
  `;
  const navCss = css`
    width: var(--width);
    height: 100vh;
    background-color: ${palette.primary.background};
    overflow-y: scroll;
    @media (max-width: var(--mobile)) ) {
      display: none;
    }
  `;

  const link = css`
    padding: 10px;
    margin: 5px 10px;
    display: inline-block;
    font-weight: bold;
    color: ${palette.primary.text};
    text-decoration: none;
  `;

  return (
    <nav class={props?.override ? navCss + display : navCss}>
      <For each={routes}>
        {({ href, title }) => {
          return (
            <A
              href={href}
              class={link}
              end
              activeClass={bgBisque}
              onClick={() => (props?.navChange ? props.navChange() : null)}
            >
              {title}
            </A>
          );
        }}
      </For>
    </nav>
  );
};
