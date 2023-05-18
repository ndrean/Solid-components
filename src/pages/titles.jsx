import TitleExamples from "../examples/title.examples.jsx";
import { ThemeProvider } from "solid-styled-components";

const theme = {
  colors: {
    primary: "red",
  },
};

export default function Titles() {
  return (
    <ThemeProvider theme={theme}>
      <TitleExamples />
    </ThemeProvider>
  );
}
