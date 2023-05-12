const camelToKebab = (str) =>
  str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// const kebabToCamel = (str) => str.replace(/-./g, (m) => m.toUpperCase()[1]);

const parseProps = (props) =>
  Object.keys(props)
    .filter((key) => key !== "children")
    .reduce((acc, key) => {
      acc[camelToKebab(key)] = props[key];
      return acc;
    }, {});

export { parseProps };
