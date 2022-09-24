export interface CoinType {
  uuid: string
  name: string
  "24hVolume": string
  btcPrice: string
  change: string
  coinrankingUrl: string
  color: string
  iconUrl: string
  listedAt: number
  lowVolume: boolean
  marketCap: string
  price: string
  rank: string
  symbol: string
  tier: string
  description: string
  supply: {
    confirmed: boolean
  }
}
