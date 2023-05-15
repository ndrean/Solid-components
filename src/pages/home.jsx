import context from "./context.js";

function home(context) {
  const { tr } = context;
  return (
    <p>
      {tr.t(
        "A demo of customized HTML elements. We pass a context object to every page which renders different components."
      )}
    </p>
  );
}

export default function Home() {
  const HomeExample = () => home(context);
  return <HomeExample />;
}
