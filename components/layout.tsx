import { ReactElement } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
