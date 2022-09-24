import React from "react"

import Head from "next/head"

import DataTable from "@components/Datatable/DataTable"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Coin Ranking</title>

        <meta name="description" content="Coin raking" />

        <link
          rel="icon"
          href="https://cdn.coinranking.com/assets/64374966bb4cd0691a9429341ae9b413.svg"
        />
      </Head>

      <main className="bg-white">
        <DataTable />
      </main>
    </div>
  )
}
