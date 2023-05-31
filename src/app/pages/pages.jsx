import { useRoutes } from "@solidjs/router";
import { styled } from "solid-styled-components";

import routes from "../../routes";
import "../../index.css";

const Main = styled("main")`
  padding: 0px 5px 0px 5px;
`;

export default (context) => () => {
  const Routes = useRoutes(routes);

  return (
    <Main>
      <Routes />
    </Main>
  );
};
