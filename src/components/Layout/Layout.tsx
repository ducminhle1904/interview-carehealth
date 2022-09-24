import React from "react"

import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Layout, Menu } from "antd"
import Image from "next/image"

const { Content, Header } = Layout

const items: MenuProps["items"] = [
  {
    label: "Dashboard",
    icon: React.createElement(AppstoreOutlined),
    key: "dashboard",
  },
  {
    label: "Setting",
    icon: React.createElement(SettingOutlined),
    key: "setting",
  },
]

interface ParentCompProps {
  children?: React.ReactNode
}

const AppLayout: React.FC<ParentCompProps> = ({ children }) => (
  <Layout>
    <Header className="fixed z-50 w-full">
      <div className="logo float-left gap-2 p-[10px]">
        <Image
          src="https://cdn.coinranking.com/assets/64374966bb4cd0691a9429341ae9b413.svg"
          alt="logo"
          width={50}
          height={50}
        />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["dashboard"]}
        items={items}
        className="flex items-center"
      />
    </Header>
    <Content className="site-layout mt-16 bg-white">
      <div className="site-layout-background mt-10 px-12">{children}</div>
    </Content>
  </Layout>
)

export default AppLayout
