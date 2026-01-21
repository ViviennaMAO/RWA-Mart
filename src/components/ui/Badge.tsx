import { cn } from '../../utils/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'success' | 'danger' | 'warning';
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-white/10 text-slate-200',
        outline: 'border border-white/20 text-slate-300',
        success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    };

    return (
        <span className={cn(
            "px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
