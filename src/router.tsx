import { Faq, Home, Login, SignUp } from "./pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp/>,
  },
  {
    path: "/faq",
    element: <Faq/>,
  },
]);