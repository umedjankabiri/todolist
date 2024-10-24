import { createBrowserRouter } from "react-router-dom";
import { App } from "App";
import { Main } from "common/components";
import { Path } from "common/utils/RouterPath.ts";
import { Login } from "features/ui";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: Path.Main,
        element: <Main />,
      },
      {
        path: Path.Login,
        element: <Login />,
      },
    ],
  },
]);
