import { useRouteData } from "@solidjs/router";
import loading from "./loading";

export default function ApiPage() {
  const routeExample = {
    path: "/api",
    title: "Api",
    data: "() => ok",
    component: "lazy(() => import(./app/pages/apiPage)",
  };

  const msg = useRouteData();
  return (
    <div>
      <h1>Routing with Solid Router</h1>
      <h3>Passing data to a route:</h3>
      <p>
        To pass data in a Route, define a route and pass a function that returns
        the data you want: for example, we pass the string "ok".
      </p>
      <p>{JSON.stringify(routeExample, null, "\t")}</p>
      <p>
        In the returned component, import <code> useRouteData </code> and use it
        to grab the data:
      </p>
      <p>`"const msg = useRouteData()"`</p>
      <p>Now you can use msg(): {msg()}</p>
    </div>
  );
}
