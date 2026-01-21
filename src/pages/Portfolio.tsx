import { useLuffaWallet } from '../hooks/useLuffaWallet';
import { Wallet } from 'lucide-react';

export function Portfolio() {
    const { isConnected, address, connect, disconnect } = useLuffaWallet();

    return (
        <div className="p-4 pt-12 space-y-6">
            <h2 className="text-xl font-display font-bold">My Portfolio</h2>

            {!isConnected ? (
                <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                        <Wallet size={32} />
                    </div>
                    <h3 className="text-lg font-bold">Connect Wallet</h3>
                    <p className="text-slate-400 text-sm">
                        Connect your Luffa wallet to view your RWA holdings and track performance.
                    </p>
                    <button
                        onClick={connect}
                        className="w-full py-3 px-6 bg-gradient-to-r from-primary to-primary-dark rounded-xl font-bold text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                    >
                        Connect Luffa
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-2xl border-white/10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-slate-400 text-xs">Total Balance</p>
                                <h3 className="text-3xl font-display font-bold">$0.00</h3>
                            </div>
                            <button onClick={disconnect} className="text-xs text-red-400">Disconnect</button>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-black/20 rounded-lg">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                            <span className="text-sm font-mono text-slate-300 truncate">{address}</span>
                        </div>
                    </div>

                    <div className="text-center py-12 text-slate-500">
                        No active investments
                    </div>
                </div>
            )}
        </div>
    );
}
