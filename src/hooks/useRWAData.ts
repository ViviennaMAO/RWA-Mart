import { useState, useEffect } from 'react'
import type { RWAProtocol, RWAMarketData, MacroData } from '../types/rwa'

/**
 * Mock RWA 数据 - 实际应用中应该从 API 获取
 * 建议数据源:
 * - RWA.xyz API
 * - Dune Analytics API
 * - DeFiLlama API
 */

const MOCK_PROTOCOLS: RWAProtocol[] = [
  {
    id: '1',
    name: 'Ondo Finance',
    category: 'Treasury',
    tvl: 580000000,
    apy: 5.2,
    change24h: 2.3,
    chain: 'Ethereum',
    description: 'Tokenized US Treasury Bills',
    website: 'https://ondo.finance',
  },
  {
    id: '2',
    name: 'Maple Finance',
    category: 'Private Credit',
    tvl: 320000000,
    apy: 8.5,
    change24h: -1.2,
    chain: 'Ethereum',
    description: 'Institutional lending pools',
    website: 'https://maple.finance',
  },
  {
    id: '3',
    name: 'Centrifuge',
    category: 'Private Credit',
    tvl: 250000000,
    apy: 9.8,
    change24h: 5.6,
    chain: 'Multiple',
    description: 'Real-world asset financing',
    website: 'https://centrifuge.io',
  },
  {
    id: '4',
    name: 'Goldfinch',
    category: 'Private Credit',
    tvl: 120000000,
    apy: 12.5,
    change24h: 3.4,
    chain: 'Ethereum',
    description: 'Crypto loans without crypto collateral',
    website: 'https://goldfinch.finance',
  },
  {
    id: '5',
    name: 'RealT',
    category: 'Real Estate',
    tvl: 85000000,
    apy: 7.2,
    change24h: 0.8,
    chain: 'Ethereum',
    description: 'Tokenized real estate',
    website: 'https://realt.co',
  },
  {
    id: '6',
    name: 'Backed Finance',
    category: 'Treasury',
    tvl: 95000000,
    apy: 4.8,
    change24h: 1.5,
    chain: 'Ethereum',
    description: 'Tokenized securities',
    website: 'https://backed.fi',
  },
]

const MOCK_MACRO_DATA: MacroData = {
  usTreasuryYield: 4.25,
  federalFundsRate: 5.33,
  inflationRate: 3.2,
  timestamp: Date.now(),
}

export function useRWAData() {
  const [protocols, setProtocols] = useState<RWAProtocol[]>([])
  const [marketData, setMarketData] = useState<RWAMarketData | null>(null)
  const [macroData, setMacroData] = useState<MacroData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // 模拟 API 延迟
        await new Promise(resolve => setTimeout(resolve, 800))

        // 设置协议数据
        setProtocols(MOCK_PROTOCOLS)

        // 计算市场数据
        const totalTVL = MOCK_PROTOCOLS.reduce((sum, p) => sum + p.tvl, 0)
        const averageAPY = MOCK_PROTOCOLS.reduce((sum, p) => sum + p.apy, 0) / MOCK_PROTOCOLS.length
        const totalChange24h = MOCK_PROTOCOLS.reduce((sum, p) => sum + p.change24h, 0) / MOCK_PROTOCOLS.length

        // 按类别统计
        const categoryMap = new Map<string, number>()
        MOCK_PROTOCOLS.forEach(p => {
          const current = categoryMap.get(p.category) || 0
          categoryMap.set(p.category, current + p.tvl)
        })

        const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, tvl]) => ({
          category,
          tvl,
          percentage: (tvl / totalTVL) * 100,
        }))

        setMarketData({
          totalTVL,
          totalProtocols: MOCK_PROTOCOLS.length,
          averageAPY,
          change24h: totalChange24h,
          categoryBreakdown,
        })

        // 设置宏观数据
        setMacroData(MOCK_MACRO_DATA)

        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const refreshData = () => {
    setIsLoading(true)
    setError(null)
    // 触发重新获取
    window.location.reload()
  }

  // 筛选和排序
  const filterProtocols = (
    category?: string,
    minAPY?: number,
    sortBy: 'tvl' | 'apy' | 'change24h' = 'tvl'
  ) => {
    let filtered = [...protocols]

    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category)
    }

    if (minAPY) {
      filtered = filtered.filter(p => p.apy >= minAPY)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'tvl':
          return b.tvl - a.tvl
        case 'apy':
          return b.apy - a.apy
        case 'change24h':
          return b.change24h - a.change24h
        default:
          return 0
      }
    })

    return filtered
  }

  // 获取热门协议
  const getTopProtocols = (limit: number = 5) => {
    return [...protocols].sort((a, b) => b.tvl - a.tvl).slice(0, limit)
  }

  // 获取高收益协议
  const getHighAPYProtocols = (limit: number = 5) => {
    return [...protocols].sort((a, b) => b.apy - a.apy).slice(0, limit)
  }

  // 获取增长最快的协议
  const getTrendingProtocols = (limit: number = 5) => {
    return [...protocols].sort((a, b) => b.change24h - a.change24h).slice(0, limit)
  }

  return {
    protocols,
    marketData,
    macroData,
    isLoading,
    error,
    refreshData,
    filterProtocols,
    getTopProtocols,
    getHighAPYProtocols,
    getTrendingProtocols,
  }
}
