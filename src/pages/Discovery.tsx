import { useState, useMemo } from 'react';
import { CATEGORIES, PROTOCOLS } from '../mocks/rwaData';
import { Badge } from '../components/ui/Badge';
import { Search, ListFilter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

type SortOption = 'tvl' | 'apy' | 'name';

export function Discovery() {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [activeSort, setActiveSort] = useState<SortOption>('tvl');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProtocols = useMemo(() => {
        return PROTOCOLS.filter(p => {
            // Category Filter
            if (activeCategory !== 'all' && p.category.toLowerCase() !== CATEGORIES.find(c => c.id === activeCategory)?.label.toLowerCase()) {
                return false;
            }
            // Search Filter
            if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            return true;
        }).sort((a, b) => {
            // Sort
            if (activeSort === 'tvl') return b.tvl - a.tvl;
            if (activeSort === 'apy') return b.apy - a.apy;
            return a.name.localeCompare(b.name);
        });
    }, [activeCategory, activeSort, searchQuery]);

    return (
        <div className="p-4 pt-4 space-y-4 pb-24">
            <header className="space-y-4 sticky top-0 bg-[#0A0F1C]/90 backdrop-blur-xl z-20 -mx-4 px-4 pb-2 pt-2">
                <h2 className="text-xl font-display font-bold">Discovery</h2>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search protocols..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-slate-600"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar items-center">
                    <button
                        className="p-2 rounded-lg bg-surface border border-white/5 text-slate-400 hover:text-white"
                        onClick={() => setActiveSort(activeSort === 'tvl' ? 'apy' : 'tvl')}
                    >
                        <ListFilter size={16} />
                    </button>

                    <button
                        onClick={() => setActiveCategory('all')}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-all",
                            activeCategory === 'all'
                                ? "bg-primary text-white border-primary"
                                : "bg-surface text-slate-400 border-white/5 hover:border-white/20"
                        )}
                    >
                        All
                    </button>

                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-all flex items-center gap-1",
                                activeCategory === cat.id
                                    ? "bg-primary text-white border-primary"
                                    : "bg-surface text-slate-400 border-white/5 hover:border-white/20"
                            )}
                        >
                            {cat.label}
                            {/* @ts-ignore */}
                            {cat.badge && (
                                <span className={cn(
                                    "text-[8px] font-bold px-1 py-0 rounded",
                                    activeCategory === cat.id ? "bg-white/20 text-white" : "bg-amber-500/20 text-amber-400"
                                )}>
                                    {/* @ts-ignore */}
                                    {cat.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </header>

            {/* List */}
            <div className="space-y-3">
                {filteredProtocols.map(p => (
                    <Link key={p.id} to={`/protocol/${p.id}`}>
                        <div className="glass-panel p-4 rounded-xl flex flex-col gap-3 group active:scale-[0.99] transition-transform">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold">
                                        {p.icon ? "img" : p.symbol[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-primary transition-colors">{p.name}</h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] text-slate-400">{p.chain}</span>
                                            <Badge variant="outline" className="text-[9px] py-0 px-1.5">{p.risk}</Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl font-bold font-display text-primary block">{p.apyFormatted}</span>
                                    <span className="text-xs text-slate-500">{p.tvlFormatted} TVL</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                {filteredProtocols.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No protocols found.
                    </div>
                )}
            </div>
        </div>
    );
}
