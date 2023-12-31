import { Faq, Home, Login, SignUp, } from "./pages";
import { createBrowserRouter } from "react-router-dom";
import Player from "./pages/player";
import SearchMusic from "./pages/search";
import { RequireAuth } from "./components/RequiredAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Home /></RequireAuth>,
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
    path: "/user/:id",
    element: <RequireAuth><SignUp /></RequireAuth>,
  },
  {
    path: "/faq",
    element: <Faq/>,
  },
  {
    path: "/player/:id",
    element: <Player/>
  },
  {
    path: "/search",
    element: <SearchMusic/>
  }
]);