/** @jsxImportSource @emotion/react */
import { styled } from "solid-styled-components";
import button from "./button";
// import fbIcon from "../icons/facebook.svg";

export default (context) => {
  const Button = button(context);

  const Form = styled("form")`
    margin: 12px;
  `;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
  };

  return function ButtonExamples() {
    return (
      <section id="button">
        <h1>Button</h1>
        <Form onSubmit={handleSubmit}>
          <h3>Flat</h3>
          <p>
            <Button>Flat label</Button>
            <Button primary>Flat primary</Button>
            <Button accent>Flat accent</Button>
            <Button ripple>Flat ripple</Button>
            <Button disabled>flat disabled</Button>
          </p>
        </Form>
      </section>
    );
  };
};
