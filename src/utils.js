import { styled } from "solid-styled-components";

const genComponent = (tag, css) => styled(tag)(() => css);

// const camelToKebab = (str) =>
//   str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// const parseProps = (props) =>
//   Object.keys(props).reduce((acc, key) => {
//     acc[camelToKebab(key)] = props[key];
//     return acc;
//   }, {});

// import { parseProps } from "../utils";

export { genComponent };
