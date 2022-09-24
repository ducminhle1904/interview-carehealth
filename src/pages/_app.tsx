import React, { useEffect, useState } from "react"

import { Spin } from "antd"
import { AppProps } from "next/app"
import "../styles/tailwind.scss"
import "antd/dist/antd.css"
import { useRouter } from "next/router"

import AppLayout from "@components/Layout/Layout"

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true)
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false)

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  })
  return (
    <AppLayout>
      {loading ? (
        <div className="absolute left-1/2 top-1/2 flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </AppLayout>
  )
}

export default MyApp
