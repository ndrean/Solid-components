import { title, dynTitle, propsTitle } from "../components/title";

export default (context) => {
  const {
    classes: { stdTitle },
  } = context;

  const blueSolid = `
    color: blue;
    border: solid 4px;
  `;

  const Title = title(stdTitle);

  const H4 = dynTitle(stdTitle, "h4");
  const H2 = dynTitle(blueSolid, "h2");

  const PropTitle = propsTitle(context);

  return (
    <>
      <p>
        A few different ways to build and use components. Take a look at the
        code. The most versatile is probably <code> dynTitles</code>.
      </p>
      <Title>StdTitle class title</Title>
      <H4>Dynamic H4 stdTitle class</H4>
      <H2>Dynamic H2 blueSolid title</H2>

      <PropTitle newClass={context.classes.stdTitle} label="Title via props" />
    </>
  );
};
