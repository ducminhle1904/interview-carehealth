import React from "react"

import { AppProps } from "next/app"

import "../styles/tailwind.scss"
import "antd/dist/antd.css"
import AppLayout from "@components/Layout/Layout"

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
