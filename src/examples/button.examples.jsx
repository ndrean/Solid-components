import { styled } from "solid-styled-components";
import button from "../components/button";
import iconSVG from "../components/imgSVG";
import { classTitle } from "../components/title";

export default (context) => {
  const {
    icon,
    classes: { stdTitle },
  } = context;
  const Button = button(context);
  const Icon = () => iconSVG(icon, 20);
  const Title = classTitle(stdTitle);
  const TallIcon = () => iconSVG(icon, 80);
  const Form = styled("form")`
    margin: 12px;
  `;

  const handleClick = (e) => {
    // console.log(Object.values(e.target.attributes));
  };

  return (
    <section id="button">
      <Form onSubmit={(e) => e.preventDefault()}>
        <Title>Flat</Title>
        <p>
          <Button flat onClick={handleClick} aria-label="btn">
            Flat
          </Button>
          <Button flat primary onClick={handleClick} aria-label="btn">
            Flat primary
          </Button>
          <Button flat accent onClick={handleClick} aria-label="btn">
            Flat accent
          </Button>
          <Button flat ripple onClick={handleClick} aria-label="btn">
            Flat ripple
          </Button>
          <Button flat disabled onClick={handleClick} aria-label="btn">
            flat disabled
          </Button>
        </p>
        <Title>Full width</Title>
        <p>
          <Button fullWidth ripple>
            full width & ripple
          </Button>
          <Button fullWidth primary>
            full primary
          </Button>
        </p>
        <Title>Icons</Title>
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
