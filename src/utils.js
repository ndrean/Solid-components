const camelToKebab = (str) =>
  str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const parseProps = (props) =>
  Object.keys(props)
    .filter((key) => key !== "children")
    .reduce((acc, key) => {
      acc[camelToKebab(key)] = props[key];
      return acc;
    }, {});

export { parseProps };
