import { Title1, Title2, Tgreen, Tdefault } from "../components/title";
import "../index.css";

export default function Titles() {
  return (
    <>
      <p>First version using "class with `css`"</p>
      <div class="center">
        <Title1>default class Title</Title1>
        <Title1 color="red" fontWeight="bold" textAlign="center">
          with class
        </Title1>
      </div>
      <hr />
      <p>Second version using "styled"</p>
      <div class="center">
        <Title2 color="orange" fontSize={"2rem"}>
          With Styled tag
        </Title2>
        <Title2>With default Styled tag </Title2>
      </div>
      <hr />
      <p>Third version</p>
      <div class="center">
        <Tgreen>Essai</Tgreen>
        <Tdefault>Default</Tdefault>
      </div>
    </>
  );
}
