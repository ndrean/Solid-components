export default (icon, width, label = "icon") =>
  () =>
    <img src={icon} width={width} height={width} alt={label} />;
