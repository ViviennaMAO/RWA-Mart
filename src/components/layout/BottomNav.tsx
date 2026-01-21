import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Wallet, type LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavItem {
    icon: LucideIcon;
    label: string;
    path: string;
}

const NAV_ITEMS: NavItem[] = [
    { icon: Home, label: 'Market', path: '/' },
    { icon: Compass, label: 'Discovery', path: '/discovery' },
    { icon: Wallet, label: 'Portfolio', path: '/portfolio' },
];

export function BottomNav() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0F1C]/95 backdrop-blur-lg border-t border-white/10 pb-safe">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
                    const isActive = location.pathname === path;
                    return (
                        <Link
                            key={path}
                            to={path}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                                isActive ? "text-primary" : "text-slate-400 hover:text-slate-200"
                            )}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
