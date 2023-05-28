import { title, dTitle } from "../components/title";

export default (context) => {
  const {
    classes: { stdTitle },
  } = context;

  const blueSolid = `
    color: blue;
    border: solid 4px;
  `;

  const H1 = dTitle("h1", stdTitle);
  const H2 = dTitle("h2", blueSolid);
  const H4 = dTitle("h4", stdTitle);

  const Title = title(context);

  return (
    <section id="title.examples">
      <p>
        A few different ways to build and use components. Take a look at the
        code.
      </p>
      <Title>1111</Title>
      <Title label="222" />
      <H1>StdTitle class title</H1>
      <H2>H2 blueSolid</H2>
      <H4>H4 stdTitle class</H4>

      <Title newClass={context.classes.stdTitle} label="Title via props" />
    </section>
  );
};
