import "./global.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { Footer } from "./components/Footer"
import { Logo } from "./components/Logo"

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Footer.FooterWrapper>
        <Logo />
        <Footer.CurrentDate />
      </Footer.FooterWrapper>
    </>
  )
}

export default App
