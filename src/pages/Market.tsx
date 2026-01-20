import { useState, useMemo } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { ArrowUpDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Mock Data
const MOCK_PROTOCOLS = [
    { id: 1, name: 'Ondo US Dollar', symbol: 'USDY', category: 'Treasury', tvl: 450000000, apy: 5.1, risk: 'Low', chain: 'Ethereum' },
    { id: 2, name: 'MatrixDock', symbol: 'STBT', category: 'Treasury', tvl: 120000000, apy: 5.3, risk: 'Low', chain: 'Ethereum' },
    { id: 3, name: 'Goldfinch', symbol: 'GFI', category: 'Private Credit', tvl: 89000000, apy: 12.5, risk: 'High', chain: 'Ethereum' },
    { id: 4, name: 'Maple Finance', symbol: 'MPL', category: 'Private Credit', tvl: 150000000, apy: 10.2, risk: 'Med', chain: 'Solana' },
    { id: 5, name: 'RealT', symbol: 'RE', category: 'Real Estate', tvl: 45000000, apy: 9.1, risk: 'Med', chain: 'Gnosis' },
    { id: 6, name: 'Backed Finance', symbol: 'bIB01', category: 'Treasury', tvl: 35000000, apy: 4.8, risk: 'Low', chain: 'Base' },
]

export function Market() {
    const navigate = useNavigate()
    const [filter, setFilter] = useState('All')
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null)

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'desc'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc'
        }
        setSortConfig({ key, direction })
    }

    const filteredData = useMemo(() => {
        let data = [...MOCK_PROTOCOLS]

        // Filter
        if (filter !== 'All') {
            data = data.filter(item => item.category === filter)
        }

        // Sort
        if (sortConfig) {
            data.sort((a: any, b: any) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
                return 0
            })
        } else {
            // Default sort by TVL desc
            data.sort((a, b) => b.tvl - a.tvl)
        }

        return data
    }, [filter, sortConfig])

    return (
        <div className="space-y-4 pb-20">
            <header className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="pl-0">
                    ← Back
                </Button>
                <h1 className="text-xl font-bold text-text-primary">Market</h1>
            </header>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['All', 'Treasury', 'Private Credit', 'Real Estate'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${filter === cat
                            ? 'bg-primary text-white font-medium'
                            : 'bg-surface text-text-secondary border border-gray-800'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Sort Bar */}
            <div className="flex justify-between items-center px-1">
                <span className="text-xs text-text-secondary">{filteredData.length} Assets</span>
                <div className="flex gap-4 text-xs">
                    <button onClick={() => handleSort('tvl')} className="flex items-center gap-1 text-text-secondary hover:text-white">
                        TVL <ArrowUpDown size={12} />
                    </button>
                    <button onClick={() => handleSort('apy')} className="flex items-center gap-1 text-text-secondary hover:text-white">
                        APY <ArrowUpDown size={12} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-3">
                {filteredData.map(item => (
                    <Card key={item.id} className="active:scale-[0.99] transition-transform" onClick={() => navigate(`/protocol/${item.id}`)}>
                        <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-text-secondary border border-gray-700">
                                    {item.symbol[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">{item.name}</h3>
                                    <div className="flex gap-2 text-xs text-text-secondary mt-0.5">
                                        <span className="bg-surface border border-gray-700 px-1.5 rounded">{item.category}</span>
                                        <span>{item.chain}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-accent font-bold text-lg">{item.apy}%</p>
                                <p className="text-xs text-text-secondary">APY</p>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between items-center text-sm">
                            <div>
                                <span className="text-text-secondary text-xs block">TVL</span>
                                <span className="text-text-primary font-medium">${(item.tvl / 1000000).toFixed(1)}M</span>
                            </div>
                            <div>
                                <span className="text-text-secondary text-xs block text-right">Risk</span>
                                <span className={`px-2 py-0.5 rounded text-xs ${item.risk === 'Low' ? 'bg-blue-500/20 text-blue-400' :
                                    item.risk === 'Med' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                    {item.risk}
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
