import { styled } from "solid-styled-components";

const grayDiv = (context) => styled("div")`
  background-color: ${context.theme.palette.primary.background};
  padding: 10px 10px;
`;

export default grayDiv;
