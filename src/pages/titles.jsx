import { Tcustom, Tdefault } from "../components/title";
import "../index.css";

export default function Titles() {
  return (
    <>
      <p>Third version</p>
      <div class="center">
        <Tcustom>Essai</Tcustom>
        <Tdefault>Default</Tdefault>
      </div>
    </>
  );
}

/*
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
*/
