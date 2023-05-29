import { styled } from "solid-styled-components";
import button from "./button";
import imgSVG from "../typo/imgSVG";
import facebook from "../assets/facebook.svg";
import { dTitle } from "../app/title";
import { tickSVG } from "../typo/svgs";

export default (context) => {
  const {
    classes: { stdTitle },
  } = context;
  const Button = button(context);
  const Title = dTitle("h1", stdTitle);
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
          <Button onClick={handleClick} aria-label="btn">
            Flat
          </Button>
          <Button primary onClick={handleClick} aria-label="btn">
            Flat primary
          </Button>
          <Button accent onClick={handleClick} aria-label="btn">
            Flat accent
          </Button>
          <Button ripple onClick={handleClick} aria-label="btn">
            Flat ripple
          </Button>
          <Button disabled onClick={handleClick} aria-label="btn">
            flat disabled
          </Button>
        </p>
        <Title>Raised</Title>
        <p>
          <Button raised onClick={handleClick} aria-label="btn">
            Raised
          </Button>
          <Button raised accent onClick={handleClick} aria-label="btn">
            Raised accent
          </Button>
          <Button raised primary onClick={handleClick} aria-label="btn">
            Raised primary
          </Button>
          <Button raised ripple onClick={handleClick} aria-label="btn">
            Raised ripple
          </Button>
          <Button raised disabled onClick={handleClick} aria-label="btn">
            Raised disabled
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
          <Button fullWidth raised accent>
            full accent raised
          </Button>
        </p>
        <Title>Icons</Title>
        <p>
          <Button onClick={handleClick}>
            <ImgSVG src={facebook} /> falt Img SVG icon
          </Button>
          <br />
          <Button ripple raised onClick={handleClick}>
            <ImgSVG src={facebook} width={80} /> resized Img SVG & ripple &
            raised
          </Button>
          <br />
          <Button fullWidth ripple onClick={handleClick}>
            <Tick size={60} /> falt SVG icon & ripple & full width
          </Button>
        </p>
      </Form>
    </section>
  );
};
