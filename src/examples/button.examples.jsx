/** @jsxImportSource @emotion/react */
import { styled } from "solid-styled-components";
import button from "../components/button";
import iconImg from "../components/iconImg";
import { BaseH1Props } from "../components/title";

export default (context) => {
  const { icon } = context;
  const Button = button(context);

  const Icon = iconImg(icon, 20);
  const TallIcon = iconImg(icon, 80);

  const Form = styled("form")`
    margin: 12px;
  `;

  const customCss2 = `
  border: none; 
  text-align: left;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  `;

  const Title = BaseH1Props();

  const handleClick = (e) => {
    console.log(Object.values(e.target.attributes));
  };

  return function ButtonExamples() {
    return (
      <section id="button">
        <Form onSubmit={(e) => e.preventDefault()}>
          <Title css={customCss2}>Flat</Title>
          <p>
            <Button flat onClick={handleClick}>
              Flat
            </Button>
            <Button flat primary onClick={handleClick}>
              Flat primary
            </Button>
            <Button flat accent onClick={handleClick}>
              Flat accent
            </Button>
            <Button flat ripple onClick={handleClick}>
              Flat ripple
            </Button>
            <Button flat disabled onClick={handleClick}>
              flat disabled
            </Button>
          </p>
          <Title css={customCss2}>Full width</Title>
          <p>
            <Button fullWidth>full width</Button>
            <Button fullWidth primary>
              full primary
            </Button>
          </p>
          <Title css={customCss2}>Icons</Title>
          <p>
            <Button onClick={handleClick}>
              <Icon /> with icon
            </Button>
            <Button onClick={handleClick}>
              <TallIcon /> with tall icon
            </Button>
            <Button fullWidth onClick={handleClick}>
              <Icon /> with icon
            </Button>
          </p>
        </Form>
      </section>
    );
  };
};
