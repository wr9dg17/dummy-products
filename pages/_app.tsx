import { Fragment } from "react"
import type { AppProps } from "next/app"
import CssBaseline from "@mui/material/CssBaseline"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <CssBaseline />
    </Fragment>
  )
}

export default MyApp
