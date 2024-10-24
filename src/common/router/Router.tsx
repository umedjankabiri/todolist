import { createBrowserRouter } from "react-router-dom";
import { App } from "App";
import { Main } from "common/components";
import { Path } from "common/utils/RouterPath.ts";
import { Login } from "features/ui";
import { Error404 } from "common/components/Error404/Error404.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: Path.Login,
        element: <Login />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);
