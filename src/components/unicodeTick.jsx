const checkTick = (fontSize) => () =>
  <span style={{ "font-size": fontSize }}>{"\u2705"}</span>;
const crossTick = (fontSize) => () =>
  <span style={{ "font-size": fontSize }}>{"\u274C"}</span>;

export { checkTick, crossTick };
