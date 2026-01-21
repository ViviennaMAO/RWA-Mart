/**
 * RWA 数据类型定义
 */

export interface RWAProtocol {
  id: string
  name: string
  category: 'Private Credit' | 'Treasury' | 'Real Estate' | 'Commodities' | 'Other'
  tvl: number
  apy: number
  change24h: number
  chain: string
  description: string
  website?: string
  logo?: string
}

export interface RWAMarketData {
  totalTVL: number
  totalProtocols: number
  averageAPY: number
  change24h: number
  categoryBreakdown: {
    category: string
    tvl: number
    percentage: number
  }[]
}

export interface UserPortfolio {
  totalValue: number
  totalEarnings: number
  positions: {
    protocol: RWAProtocol
    balance: number
    value: number
    earnings: number
    apy: number
  }[]
}

export interface MacroData {
  usTreasuryYield: number
  federalFundsRate: number
  inflationRate: number
  timestamp: number
}
