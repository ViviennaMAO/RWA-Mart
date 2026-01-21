import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { TrendingUp, Activity, ArrowRight, Wallet, Share2 } from 'lucide-react'
import { useLuffaWallet } from '../hooks/useLuffaWallet'
import { useRWAData } from '../hooks/useRWAData'
import { useLuffaShare } from '../hooks/useLuffaShare'
import type { RWAProtocol } from '../types/rwa'

export function Home() {
    const navigate = useNavigate()
    const { address, isConnected, isLoading: walletLoading, connect, formatAddress } = useLuffaWallet()
    const { marketData, getTopProtocols, isLoading: dataLoading } = useRWAData()
    const { shareMarketData } = useLuffaShare()

    const topProtocols = getTopProtocols(3)

    const formatTVL = (tvl: number) => {
        if (tvl >= 1e9) return `$${(tvl / 1e9).toFixed(2)}B`
        if (tvl >= 1e6) return `$${(tvl / 1e6).toFixed(0)}M`
        return `$${tvl.toLocaleString()}`
    }

    const handleShare = async () => {
        if (marketData) {
            const result = await shareMarketData(
                formatTVL(marketData.totalTVL),
                marketData.totalProtocols
            )
            if (result.success) {
                console.log('Shared successfully')
            }
        }
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
                        RWA Mart
                    </h1>
                    <p className="text-xs text-gray-400">Real World Assets on Chain</p>
                </div>
                {walletLoading ? (
                    <Button variant="secondary" size="sm" className="bg-surface/50 border-gray-800" disabled>
                        Loading...
                    </Button>
                ) : isConnected && address ? (
                    <Button variant="secondary" size="sm" className="bg-surface/50 border-gray-800">
                        {formatAddress(address)}
                    </Button>
                ) : (
                    <Button
                        variant="secondary"
                        size="sm"
                        className="bg-surface/50 border-gray-800 flex items-center gap-1"
                        onClick={connect}
                    >
                        <Wallet size={14} />
                        Connect
                    </Button>
                )}
            </header>

            {/* Total RWA Value */}
            <section className="text-center py-4 relative">
                <p className="text-text-secondary text-sm mb-1">Total RWA Value</p>
                {dataLoading ? (
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-700 rounded w-48 mx-auto mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-24 mx-auto"></div>
                    </div>
                ) : marketData ? (
                    <>
                        <h2 className="text-4xl font-bold text-white tracking-tight">
                            {formatTVL(marketData.totalTVL)}
                        </h2>
                        <div className={`flex items-center justify-center gap-1 text-sm mt-1 ${marketData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            <TrendingUp size={16} />
                            <span>{marketData.change24h >= 0 ? '+' : ''}{marketData.change24h.toFixed(1)}% (24h)</span>
                        </div>
                        <button
                            onClick={handleShare}
                            className="absolute top-0 right-0 p-2 text-blue-400 hover:text-blue-300 transition-colors"
                            aria-label="Share market data"
                        >
                            <Share2 size={18} />
                        </button>
                    </>
                ) : (
                    <p className="text-text-secondary">Unable to load data</p>
                )}
            </section>

            {/* Hot Protocols */}
            <section>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                        <Activity size={16} className="text-accent" /> Hot Protocols
                    </h3>
                    <button onClick={() => navigate('/market')} className="text-xs text-blue-400 flex items-center gap-1">
                        View All <ArrowRight size={12} />
                    </button>
                </div>
                {dataLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="p-4 bg-surface/80 rounded-xl animate-pulse">
                                <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                                <div className="h-3 bg-gray-700 rounded w-24"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {topProtocols.map((protocol: RWAProtocol) => (
                            <Card key={protocol.id} className="flex justify-between items-center p-4 active:scale-[0.98] transition-transform cursor-pointer">
                                <div>
                                    <h4 className="font-bold text-white">{protocol.name}</h4>
                                    <div className="flex gap-2 text-xs mt-1">
                                        <span className="text-text-secondary">TVL: {formatTVL(protocol.tvl)}</span>
                                        <span className="text-blue-400 bg-blue-400/10 px-1 rounded">{protocol.category}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-accent font-bold">{protocol.apy.toFixed(1)}%</p>
                                    <p className="text-xs text-text-secondary">APY</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
