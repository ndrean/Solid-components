import { styled } from "solid-styled-components";

const Link = styled("a")`
  text-decoration: none;
  background-color: beige;
  padding: 3px;
  border-radius: 5px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default Link;
