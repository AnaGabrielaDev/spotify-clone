import { Home } from "./pages/home";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);