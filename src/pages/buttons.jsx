import buttonExamples from "../components/button.examples";
import { red } from "material-ui-colors";

const context = {
  color: red,
  borderRadius: "4px",
};

const ButtonExamples = buttonExamples(context);

export default function Buttons() {
  return <ButtonExamples />;
}
