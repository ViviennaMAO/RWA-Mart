import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { TrendingUp, Globe, Activity, ArrowRight } from 'lucide-react'

export function Home() {
    const navigate = useNavigate()

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-accent bg-clip-text text-transparent">
                        RWA Mart
                    </h1>
                    <p className="text-xs text-text-secondary">Real World Assets on Chain</p>
                </div>
                <Button variant="secondary" size="sm" className="bg-surface/50 border-gray-800">
                    0x12..34
                </Button>
            </header>

            {/* Total RWA Value */}
            <section className="text-center py-4">
                <p className="text-text-secondary text-sm mb-1">Total RWA Value</p>
                <h2 className="text-4xl font-bold text-white tracking-tight">$8.42B</h2>
                <div className="flex items-center justify-center gap-1 text-green-400 text-sm mt-1">
                    <TrendingUp size={16} />
                    <span>+2.4% (24h)</span>
                </div>
            </section>

            {/* Macro Data Scroll */}
            <section>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                        <Globe size={16} className="text-blue-400" /> Global Macro
                    </h3>
                    <span className="text-xs text-text-secondary">Scroll for more</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {[
                        { label: 'Fed Rate', value: '5.50%', change: '0.0%' },
                        { label: 'US 10Y', value: '4.21%', change: '+1.2%' },
                        { label: 'CPI (YoY)', value: '3.1%', change: '-0.1%' },
                        { label: 'VIX', value: '13.4', change: '-2.4%' },
                    ].map((item, i) => (
                        <Card key={i} className="min-w-[120px] p-3 bg-surface/80">
                            <p className="text-xs text-text-secondary">{item.label}</p>
                            <p className="text-base font-bold text-white mt-1">{item.value}</p>
                            <span className={item.change.startsWith('+') ? 'text-green-400 text-xs' : 'text-red-400 text-xs'}>
                                {item.change}
                            </span>
                        </Card>
                    ))}
                </div>
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
                <div className="space-y-3">
                    {[
                        { name: 'Ondo US Dollar', apy: '5.1%', tvl: '$450M', risk: 'Low' },
                        { name: 'MatrixDock', apy: '5.3%', tvl: '$120M', risk: 'Low' },
                        { name: 'Goldfinch', apy: '8.2%', tvl: '$89M', risk: 'Med' },
                    ].map((p, i) => (
                        <Card key={i} className="flex justify-between items-center p-4 active:scale-[0.98] transition-transform">
                            <div>
                                <h4 className="font-bold text-white">{p.name}</h4>
                                <div className="flex gap-2 text-xs mt-1">
                                    <span className="text-text-secondary">TVL: {p.tvl}</span>
                                    <span className="text-blue-400 bg-blue-400/10 px-1 rounded">{p.risk} Risk</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-accent font-bold">{p.apy}</p>
                                <p className="text-xs text-text-secondary">APY</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}
