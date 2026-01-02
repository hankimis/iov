'use client';

import Link from 'next/link';
import { Users, Newspaper, MessageSquare, LogOut, LayoutDashboard, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push('/admin');
    };

    const navItems = [
        { id: 'creators', label: 'Creators', icon: <Users size={20} /> },
        { id: 'news', label: 'Newsroom', icon: <Newspaper size={20} /> },
        { id: 'applications', label: 'Applications', icon: <MessageSquare size={20} /> },
    ];

    return (
        <div className="w-64 bg-[#111] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0">
            <div className="p-8">
                <h1 className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
                    IOV <span className="text-[#dfff00]">ADMIN</span>
                </h1>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">Content Management</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id
                                ? 'bg-[#dfff00] text-black shadow-[0_0_15px_rgba(223,255,0,0.3)]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#dfff00] to-cyan-400" />
                    <div className="flex-1">
                        <p className="text-sm font-bold text-white">Admin User</p>
                        <p className="text-xs text-green-500">● Online</p>
                    </div>
                </div>
                <Link
                    href="/"
                    className="w-full mt-2 flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <Home size={14} /> Go to Main
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full mt-1 flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    <LogOut size={14} /> Sign Out
                </button>
            </div>
        </div>
    );
}
