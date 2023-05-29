import { A } from "@solidjs/router";
import { css } from "solid-styled-components";
// import "../../index.css";
import routes from "../../routes";

export default (context) => (props) => {
  const {
    theme: { palette },
  } = context;

  const bgBisque = css`
    background-color: ${palette.secondary.background};
  `;

  const link = css`
    padding: 10px;
    margin: 5px 10px;
    display: inline-block;
    font-weight: bold;
    color: ${palette.primary.text};
    text-decoration: none;
    &:hover {
      transform: scale(1.1);
      transition: 0.3s;
    }
  `;

  return (
    <nav>
      <For each={routes}>
        {({ href, title }) => {
          return (
            <A
              href={href}
              class={link}
              end
              activeClass={bgBisque}
              onClick={() => {
                props?.navChange ? props.navChange() : null;
              }}
            >
              {title}
            </A>
          );
        }}
      </For>
      <hr />
    </nav>
  );
};
