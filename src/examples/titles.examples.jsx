import { title, dTitle, sTitle } from "../components/title";

export default (context) => {
  const {
    classes: { stdTitle },
  } = context;

  const blueSolid = `
    color: blue;
    border: solid 4px;
  `;

  const green = `color: green;`;

  const H1 = dTitle("h1", stdTitle);
  const H2 = dTitle("h2", blueSolid);
  const H4 = dTitle("h4", stdTitle);

  const S3 = sTitle(context)("h3", stdTitle);

  const Title = title(context);

  return (
    <section id="title.examples">
      <p>
        A few different ways to build and use components. Take a look at the
        code.
      </p>
      <Title>Standard title component</Title>
      <H1>StdTitle class h1</H1>
      <H2>h2 blueSolid</H2>
      <H4>h4 stdTitle class</H4>
      <S3 newClass={green}>Dynamic h3 newClass prop</S3>

      <Title newClass={context.classes.stdTitle} label="Title via props" />
    </section>
  );
};
