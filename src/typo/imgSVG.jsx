export default () => (props) => {
  const src = props?.src || "";
  const alt = props?.alt || "icon";
  const width = props?.width || "50px";
  const height = props?.height || width;

  return <img src={src} width={width} height={height} alt={alt} />;
};
