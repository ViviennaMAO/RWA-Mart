import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, ShieldCheck } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { PROTOCOLS } from '../mocks/rwaData';

// Mock Yield Data
const YIELD_DATA = [
    { date: 'Jan', value: 4.8 },
    { date: 'Feb', value: 4.9 },
    { date: 'Mar', value: 5.0 },
    { date: 'Apr', value: 5.1 },
    { date: 'May', value: 5.0 },
    { date: 'Jun', value: 5.2 },
];

export function ProtocolDetails() {
    const { protocolId } = useParams();
    const navigate = useNavigate();
    const protocol = PROTOCOLS.find(p => p.id === protocolId);

    if (!protocol) {
        return <div className="p-8 text-center">Protocol not found</div>;
    }

    return (
        <div className="pb-24">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-[#0A0F1C]/80 backdrop-blur-md p-4 flex items-center gap-4 border-b border-white/5">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/5 rounded-full">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="font-display font-bold text-lg">{protocol.name}</h1>
            </div>

            <div className="p-4 space-y-6">
                {/* Main Stats Card */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-2xl rounded-full" />
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold">
                                {protocol.symbol[0]}
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-400">Current APY</p>
                                <p className="text-3xl font-bold font-display text-primary">{protocol.apyFormatted}</p>
                            </div>
                        </div>

                        <div className="h-32 -mx-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={YIELD_DATA}>
                                    <defs>
                                        <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#F59E0B" fillOpacity={1} fill="url(#colorYield)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="glass-panel p-4 rounded-xl">
                        <p className="text-xs text-slate-400 mb-1">Risk Rating</p>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-emerald-400" />
                            <span className="font-bold">{protocol.risk}</span>
                        </div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl">
                        <p className="text-xs text-slate-400 mb-1">TVL</p>
                        <span className="font-bold">{protocol.tvlFormatted}</span>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <h3 className="font-bold text-lg">About</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {protocol.description}
                    </p>
                </div>

                {/* Asset Composition */}
                <div className="space-y-3">
                    <h3 className="font-bold text-lg">Underlying Assets</h3>
                    {protocol.assets.map((asset, i) => (
                        <div key={i} className="flex justify-between items-center glass-panel p-3 rounded-lg">
                            <span className="text-sm text-slate-300">{asset.name}</span>
                            <span className="text-sm font-mono">{asset.value}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0A0F1C]/90 backdrop-blur-xl border-t border-white/10 flex gap-3 max-w-md mx-auto">
                <button className="flex-1 py-3.5 rounded-xl bg-white/5 border border-white/10 font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Globe size={16} /> Website
                </button>
                <button className="flex-[2] py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark font-bold text-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Invest Now
                </button>
            </div>
        </div>
    );
}
