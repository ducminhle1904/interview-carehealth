import React, { useCallback, useEffect, useState } from "react"

import { RiseOutlined, FallOutlined, SearchOutlined } from "@ant-design/icons"
import { Table, Avatar, Tag, Input } from "antd"
import type { ColumnsType, TablePaginationConfig } from "antd/es/table"
import type { FilterValue, SorterResult } from "antd/es/table/interface"
import { debounce } from "lodash-es"
import Router from "next/router"

import { getCoins, searchCoin } from "@utils/apiCall"
import { generateCurrency } from "@utils/helper"
import { CoinType } from "@utils/interface"

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

const DataTable = () => {
  const [dataFetch, setDataFetch] = useState()
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      position: ["bottomCenter"],
      total: 0,
    },
  })

  const fetchData = () => {
    setLoading(true)
    getCoins(
      tableParams.pagination.pageSize,
      tableParams.pagination.current
    ).then((res) => {
      setDataFetch(res.coins)
      setLoading(false)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.stats.total,
        },
      })
    })
  }

  /** Init data for table */
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tableParams)])

  /** Simulation of real time data each 30s */
  useEffect(() => {
    let interval = setInterval(() => fetchData(), 30000)
    //destroy interval on unmount
    return () => clearInterval(interval)
  })

  /** Handle Search on change input */
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value) {
      setLoading(true)
      searchCoin(value)
        .then((res) => {
          setLoading(false)
          setDataFetch(res.coins)
        })
        .catch((err) => console.log(err))
    } else {
      setLoading(true)
      getCoins()
        .then((res) => {
          setLoading(false)
          setDataFetch(res.coins)
        })
        .catch((err) => console.log(err))
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce(
      (nextValue: React.ChangeEvent<HTMLInputElement>) => onSearch(nextValue),
      500
    ),
    []
  )

  /** For pagination */
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<CoinType>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    })
  }

  /** Define column for table */
  const columns: ColumnsType<CoinType> = [
    {
      title: "",
      dataIndex: "iconUrl",
      key: "iconUrl",
      width: "5%",
      render: (iconUrl) => <Avatar src={iconUrl} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (item, record) => (
        <div>
          <p className="mb-0 font-bold text-[#002358]">{item}</p>
          <Tag color={record?.color}>{record?.symbol}</Tag>
        </div>
      ),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "20%",
      render: (price) => (
        <span className="font-bold text-[#002358]">
          {generateCurrency(price)}
        </span>
      ),
      sorter: (a, b) => Number(a?.price) - Number(b?.price),
    },
    {
      title: "Total market cap",
      dataIndex: "marketCap",
      key: "marketCap",
      width: "20%",
      render: (marketCap) => (
        <span className="font-bold text-[#002358]">
          {generateCurrency(marketCap)}
        </span>
      ),
      sorter: (a, b) => Number(a?.marketCap) - Number(b?.marketCap),
    },
    {
      title: "Price changes",
      dataIndex: "change",
      key: "change",
      render: (change) => (
        <Tag
          icon={Number(change) < 0 ? <FallOutlined /> : <RiseOutlined />}
          color={Number(change) < 0 ? "#eb0a25" : "#00b053"}
          className="flex min-w-[75px] items-center"
        >
          <span className="font-bold">{change}%</span>
        </Tag>
      ),
      sorter: (a, b) => Number(a?.change) - Number(b?.change),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={dataFetch}
      scroll={{ x: "max-content", y: "60vh" }}
      rowKey={(record) => record.uuid}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      onRow={(record) => {
        return {
          onClick: (event) => {
            event.preventDefault()
            Router.push(`/coin/${record?.uuid}`)
          },
        }
      }}
      title={() => (
        <Input
          prefix={<SearchOutlined className="site-form-item-icon" />}
          placeholder="Search coin"
          onChange={debounceSearch}
        />
      )}
    />
  )
}

export default DataTable
