import { styled } from "solid-styled-components";

const Link = styled("a")`
  text-decoration: none;
  background-color: beige;
  padding: 3px;
  border-radius: 5px;
  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

export default Link;
