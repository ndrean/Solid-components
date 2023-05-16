import { styled } from "solid-styled-components";
import button from "../components/button";
import iconSVG from "../components/imgSVG";
import { BaseH1Props } from "../components/title";

export default (context) => {
  const { icon, customCss } = context;
  const Button = button(context);
  const Icon = () => iconSVG(icon, 20);
  const Title = BaseH1Props();
  const TallIcon = () => iconSVG(icon, 80);
  const Form = styled("form")`
    margin: 12px;
  `;

  const handleClick = (e) => {
    console.log(Object.values(e.target.attributes));
  };

  return (
    <section id="button">
      <Form onSubmit={(e) => e.preventDefault()}>
        <Title css={customCss}>Flat</Title>
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
        <Title css={customCss}>Full width</Title>
        <p>
          <Button fullWidth ripple>
            full width & ripple
          </Button>
          <Button fullWidth primary>
            full primary
          </Button>
        </p>
        <Title css={customCss}>Icons</Title>
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
