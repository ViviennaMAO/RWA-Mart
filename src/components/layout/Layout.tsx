import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export function Layout() {
    return (
        <div className="min-h-screen bg-background text-white pb-20 font-sans">
            <main className="max-w-md mx-auto min-h-screen relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
}
