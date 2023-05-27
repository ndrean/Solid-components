import { styled } from "solid-styled-components";
import button from "../components/button";
import imgSVG from "../components/imgSVG";
import facebook from "../assets/facebook.svg";
import { dynTitle } from "../components/title";
import { tickSVG } from "../components/svgs";

export default (context) => {
  const {
    classes: { stdTitle },
  } = context;
  const Button = button(context);
  const Title = dynTitle("h1", stdTitle);
  const ImgSVG = imgSVG();
  const Tick = tickSVG(context);

  const Form = styled("form")`
    margin: 12px;
  `;

  const handleClick = (e) => {
    // console.log(Object.values(e.target.attributes));
  };

  return () => (
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
            <ImgSVG src={facebook} /> with Img SVG icon
          </Button>
          <br />
          <Button ripple onClick={handleClick}>
            <ImgSVG src={facebook} width={80} /> with resized Img SVG & ripple
          </Button>
          <br />
          <Button fullWidth ripple onClick={handleClick}>
            <Tick size={60} /> with SVG icon & ripple & full width
          </Button>
        </p>
      </Form>
    </section>
  );
};
