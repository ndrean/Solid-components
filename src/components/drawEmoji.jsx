export default () => (props) => {
  // const { size = 48 } = props;
  const name = props.name || "emoji";
  const label = props.label || "emoji";
  const mr = () => props.mr + "px" || "0px";
  const ml = () => props.ml + "px" || "0px";
  const mt = () => props.mt + "px" || "0px";
  const size = () => props.size || 48;
  return (
    <span
      style={{
        "font-size": size() + "px",
        "margin-left": ml(),
        "margin-right": mr(),
        "margin-top": mt(),
      }}
      role="img"
      aria-label={name}
    >
      {props.children || label}
    </span>
  );
};
