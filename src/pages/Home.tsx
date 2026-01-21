import { CATEGORIES, PROTOCOLS } from '../mocks/rwaData';
import { Badge } from '../components/ui/Badge';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
    const topProtocols = PROTOCOLS.slice(0, 3);

    return (
        <div className="p-4 space-y-6 pb-24">
            {/* Header */}
            <header className="flex justify-between items-center pt-2">
                <div>
                    <h1 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                        RWA Mart
                    </h1>
                    <p className="text-xs text-slate-400">Yield from the Real World</p>
                </div>
                {/* Simple Wallet Status Indicator (Mock) */}
                <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
            </header>

            {/* TVL Hero Section */}
            <section className="glass-panel p-6 rounded-2xl border-white/10 relative overflow-hidden group">
                <div className="absolute top-[-50%] right-[-50%] w-64 h-64 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors duration-700" />

                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Value Locked</p>
                <div className="mt-1 flex items-baseline gap-3">
                    <span className="text-4xl font-bold font-display text-white">$2.45B</span>
                    <Badge variant="success" className="flex items-center gap-1">
                        +2.4% <span className="text-[8px] opacity-70">24H</span>
                    </Badge>
                </div>
            </section>

            {/* Market Composition */}
            <section className="space-y-3">
                <h3 className="text-sm font-bold text-slate-200 px-1">Market Sectors</h3>
                <div className="grid grid-cols-2 gap-3">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.id} className="glass-panel p-4 rounded-xl flex flex-col justify-between h-24 hover:bg-white/5 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start">
                                <span className="text-xl">{cat.icon}</span>
                                <span className={cat.change.startsWith('+') ? "text-emerald-400 text-xs" : "text-rose-400 text-xs"}>
                                    {cat.change}
                                </span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-slate-400">{cat.label}</p>
                                    {/* @ts-ignore */}
                                    {cat.badge && (
                                        <span className="text-[8px] font-bold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">
                                            {/* @ts-ignore */}
                                            {cat.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="text-lg font-bold font-display">{cat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trending Protocols */}
            <section className="space-y-3">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-sm font-bold text-slate-200">Hot Protocols</h3>
                    <Link to="/discovery" className="text-xs text-primary flex items-center hover:underline">
                        View All <ChevronRight size={12} />
                    </Link>
                </div>

                <div className="space-y-3">
                    {topProtocols.map((p) => (
                        <Link key={p.id} to={`/protocol/${p.id}`} className="block">
                            <div className="glass-panel p-4 rounded-xl flex items-center justify-between group active:scale-[0.98] transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold overflow-hidden">
                                        {p.icon ? "img" : p.symbol[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white group-hover:text-primary transition-colors">{p.name}</h4>
                                        <span className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">{p.category}</span>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-primary font-bold font-display">{p.apyFormatted}</p>
                                    <p className="text-[10px] text-slate-500">APY</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
