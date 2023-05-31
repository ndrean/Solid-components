import { styled } from "solid-styled-components";

const grayDiv = ({ theme: { bg } }) => styled("div")`
  background-color: ${bg.lightGrey};
  padding: 10px 10px;
`;

export default grayDiv;
