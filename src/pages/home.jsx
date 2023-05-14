const context = {
  tr: {
    t: (v) => v,
  },
};

function home(context) {
  const { tr } = context;
  return <p>{tr.t("A demo of customized HTML elements")}</p>;
}

const HomeExample = () => home(context);

export default function Home() {
  return <HomeExample />;
}
