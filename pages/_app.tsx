import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import "normalize.css/normalize.css"
import "../styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
