/** @jsxImportSource @emotion/react */
import { styled } from "solid-styled-components";
import button from "../components/button";
import iconSVG from "../components/iconSVG";
import { BaseH1Props } from "../components/title";

export default (context) => {
  const { icon } = context;
  const Button = button(context);
  const Icon = iconSVG(icon, 20);
  const TallIcon = iconSVG(icon, 80);
  const Title = BaseH1Props();
  const Form = styled("form")`
    margin: 12px;
  `;

  const customCss2 = `
  border: none; 
  text-align: left;
  padding-left: 12px;
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, .2);
  `;

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
            <Button fullWidth ripple>
              full width & ripple
            </Button>
            <Button fullWidth primary>
              full primary
            </Button>
          </p>
          <Title css={customCss2}>Icons</Title>
          <p>
            <Button onClick={handleClick}>
              <Icon /> with icon
            </Button>
            <Button ripple onClick={handleClick}>
              <TallIcon /> with tall icon & ripple
            </Button>
            <Button fullWidth ripple onClick={handleClick}>
              <Icon /> with icon & ripple
            </Button>
          </p>
        </Form>
      </section>
    );
  };
};
