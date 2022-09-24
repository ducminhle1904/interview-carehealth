import request from "./axios"

export const getCoins = async (
  limit: number = 20,
  offset: number = 0,
  orderBy: string = "marketCap"
) => {
  return await request
    .get("/coins", {
      params: {
        limit,
        offset,
        orderBy,
      },
    })
    .then((res) => res.data)
    .catch((err) => err)
}

export const getCoin = async (uuid: string | string[]) => {
  return await request
    .get(`coin/${uuid}`, {
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
      },
    })
    .then((res) => res.data)
    .catch((err) => err)
}

export const searchCoin = async (query: string) => {
  return await request
    .get("/search-suggestions", {
      params: {
        query,
        referenceCurrencyUuid: "yhjMzLPhuIDl",
      },
    })
    .then((res) => res.data)
    .catch((err) => err)
}
