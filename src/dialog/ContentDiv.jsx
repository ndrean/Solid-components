import { styled } from "solid-styled-components";

export default function contentDiv({ shadows }) {
  return styled("div")`
    .header {
      > h1 {
        text-align: center;
        margin: 0 -10px 0 -10px;
        background-color: bisque;
        border: none;
        box-shadow: ${shadows[4]};
      }
    }
    .main {
      padding: 10px;
      > div > img {
        margin-right: 5px;
      }
      > div > div > img {
        margin-right: 5px;
      }
    }

    .footer {
      margin-top: 2em;
    }
  `;
}
