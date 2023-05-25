export default () => (props) => {
  // const { size = 48 } = props;
  const name = props.name || "emoji";
  const label = props.label || "emoji";
  const size = () => props.size || 48;
  return (
    <span style={{ "font-size": size() + "px" }} role="img" aria-label={name}>
      {props.children || label}
    </span>
  );
};
