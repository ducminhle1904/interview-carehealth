import { Button, Descriptions, PageHeader, Statistic, Tabs, Empty } from "antd"
import { GetServerSideProps } from "next"
import Head from "next/head"
import ReactHtmlParser from "react-html-parser"

import { getCoin } from "@utils/apiCall"
import { generateCurrency } from "@utils/helper"
import { CoinType } from "@utils/interface"

const { TabPane } = Tabs
const renderContent = (column: number, data: CoinType) => (
  <Descriptions size="small" column={column}>
    <Descriptions.Item label="Rank">{data.rank}</Descriptions.Item>
    <Descriptions.Item label="Description">
      {ReactHtmlParser(data.description)}
    </Descriptions.Item>
  </Descriptions>
)
const extraContent = (data: CoinType) => {
  return (
    <div
      style={{
        display: "flex",
        width: "max-content",
        justifyContent: "flex-end",
      }}
    >
      <Statistic
        title="Status"
        value={data?.supply?.confirmed ? "LIVE" : "OFF"}
        style={{
          marginRight: 32,
        }}
      />
      <Statistic title="Price" value={generateCurrency(Number(data?.price))} />
    </div>
  )
}

const Content: React.FC<{
  children: React.ReactNode
  extra: React.ReactNode
}> = ({ children, extra }) => (
  <div className="content">
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
)

export default function CoinDetailPage({ data }) {
  return (
    <div>
      <Head>
        <title>{data?.name} - Coin Ranking</title>
        <meta name="description" content={data?.description} />

        <link rel="icon" href={data?.iconUrl} />
      </Head>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title={data?.name}
        subTitle={data?.symbol}
        extra={[
          <Button
            key="1"
            type="primary"
            href={data?.websiteUrl}
            target="_blank"
          >
            More Detail
          </Button>,
        ]}
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exchanges" key="1">
              <Empty description="Comming soon" />
            </TabPane>
            <TabPane tab="Markets" key="2">
              <Empty description="Comming soon" />
            </TabPane>
          </Tabs>
        }
      >
        <Content extra={extraContent(data)}>{renderContent(1, data)}</Content>
      </PageHeader>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
}) => {
  const coinDetail = await getCoin(id)
  return {
    props: {
      data: coinDetail?.coin,
    },
  }
}
