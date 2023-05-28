import { styled } from "solid-styled-components";

export default function contentDiv(context) {
  return styled("div")`
    .header {
      > h1 {
        text-align: center;
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
      display: flex;
      margin-top: 2em;
    }
  `;
}
