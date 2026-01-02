'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '@/components/admin/Sidebar';
import CreatorModal from '@/components/admin/CreatorModal';
import NewsModal from '@/components/admin/NewsModal';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('creators');
    const [creators, setCreators] = useState<any[]>([]);
    const [news, setNews] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Modals state
    const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const router = useRouter();

    useEffect(() => {
        if (!document.cookie.includes('admin_auth=true')) {
            router.push('/admin');
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        await Promise.all([
            fetch('/api/creators').then(res => res.json()).then(setCreators),
            fetch('/api/news').then(res => res.json()).then(setNews),
            fetch('/api/applications').then(res => res.json()).then(setApplications),
        ]);
        setLoading(false);
    };

    // --- Handlers ---
    const handleSaveCreator = async (data: any) => {
        if (editingItem) {
            await fetch('/api/creators', {
                method: 'PUT',
                body: JSON.stringify({ id: editingItem.id, ...data })
            });
        } else {
            await fetch('/api/creators', {
                method: 'POST',
                body: JSON.stringify(data)
            });
        }
        setEditingItem(null);
        fetchData();
    };

    const handleSaveNews = async (data: any) => {
        if (editingItem) {
            await fetch('/api/news', {
                method: 'PUT',
                body: JSON.stringify({ id: editingItem.id, ...data })
            });
        } else {
            await fetch('/api/news', {
                method: 'POST',
                body: JSON.stringify(data)
            });
        }
        setEditingItem(null);
        fetchData();
    };

    const handleDelete = async (type: 'creators' | 'news', id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' });
        fetchData();
    };

    const openEdit = (item: any, type: 'creator' | 'news') => {
        setEditingItem(item);
        if (type === 'creator') setIsCreatorModalOpen(true);
        if (type === 'news') setIsNewsModalOpen(true);
    };

    const openCreate = (type: 'creator' | 'news') => {
        setEditingItem(null);
        if (type === 'creator') setIsCreatorModalOpen(true);
        if (type === 'news') setIsNewsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto h-screen bg-neutral-900/50">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-white capitalize">
                            {activeTab}
                        </h2>
                        <p className="text-gray-400">Manage your {activeTab} content here.</p>
                    </div>

                    {activeTab !== 'applications' && (
                        <button
                            onClick={() => openCreate(activeTab === 'creators' ? 'creator' : 'news')}
                            className="px-5 py-3 bg-[#dfff00] text-black font-bold rounded-xl hover:bg-[#ccee00] transition-colors flex items-center gap-2 shadow-lg shadow-[#dfff00]/20"
                        >
                            <Plus size={20} /> Add New
                        </button>
                    )}
                </header>

                {loading ? (
                    <div className="flex items-center justify-center h-64 text-gray-500">Loading data...</div>
                ) : (
                    <>
                        {/* CREATORS TAB */}
                        {activeTab === 'creators' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {creators.map((item) => (
                                    <div key={item.id} className="bg-[#111] rounded-2xl p-4 border border-white/5 group hover:border-white/20 transition-all">
                                        <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 relative bg-black">
                                            <div className="relative w-full h-full">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEdit(item, 'creator')}
                                                    className="p-2 bg-white/90 text-black rounded-lg hover:bg-white"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete('creators', item.id)}
                                                    className="p-2 bg-red-500/90 text-white rounded-lg hover:bg-red-600"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-xs font-bold text-white border border-white/10">
                                                {item.followers}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-white leading-tight">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                            </div>
                                            <span className="text-xs font-bold px-2 py-1 bg-white/5 rounded text-gray-400 border border-white/5">
                                                {item.platform}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* NEWS TAB */}
                        {activeTab === 'news' && (
                            <div className="space-y-4 max-w-5xl">
                                {news.map((item) => (
                                    <div key={item.id} className="bg-[#111] p-6 rounded-2xl border border-white/5 flex gap-6 group hover:bg-[#151515] transition-colors relative">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`text-xs font-bold px-2 py-1 rounded border ${item.category === 'NOTICE' ? 'text-[#dfff00] border-[#dfff00]' : 'text-gray-400 border-gray-700'
                                                    }`}>
                                                    {item.category}
                                                </span>
                                                <span className="text-xs text-gray-600 font-mono">{item.date}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-gray-400 text-sm line-clamp-2">{item.desc}</p>
                                        </div>

                                        <div className="flex gap-2 self-start opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-6 lg:static lg:opacity-100">
                                            <button
                                                onClick={() => openEdit(item, 'news')}
                                                className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/5 hover:border-white/20"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete('news', item.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 bg-white/5 rounded-lg border border-white/5 hover:border-red-500/30"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* APPLICATIONS TAB */}
                        {activeTab === 'applications' && (
                            <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden shadow-xl max-w-6xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#1a1a1a] text-xs uppercase text-gray-400 font-bold tracking-wider border-b border-white/5">
                                            <tr>
                                                <th className="p-5">Status</th>
                                                <th className="p-5">Applicant</th>
                                                <th className="p-5">Contact Info</th>
                                                <th className="p-5">Details</th>
                                                <th className="p-5 text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {applications.map((app) => (
                                                <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                                                    <td className="p-5">
                                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${app.type === 'business' ? 'bg-blue-500/20 text-blue-400' : 'bg-[#dfff00]/10 text-[#dfff00]'
                                                            }`}>
                                                            {app.type}
                                                        </span>
                                                    </td>
                                                    <td className="p-5">
                                                        <div className="font-bold text-white text-lg">
                                                            {app.type === 'business' ? app.company : app.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-0.5">ID: {app.id.slice(0, 8)}...</div>
                                                    </td>
                                                    <td className="p-5">
                                                        <div className="flex flex-col gap-1 text-sm text-gray-300">
                                                            <span>{app.email}</span>
                                                            <span>{app.contact}</span>
                                                            {app.sns && <a href={app.sns} target="_blank" className="text-blue-400 hover:underline text-xs truncate max-w-[150px]">{app.sns}</a>}
                                                        </div>
                                                    </td>
                                                    <td className="p-5">
                                                        <p className="text-sm text-gray-300 max-w-xs line-clamp-3 group-hover:line-clamp-none transition-all">
                                                            {app.message}
                                                        </p>
                                                    </td>
                                                    <td className="p-5 text-right text-xs text-gray-500 font-mono">
                                                        {new Date(app.timestamp).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {applications.length === 0 && (
                                    <div className="p-20 text-center flex flex-col items-center">
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-600 mb-4">
                                            <Search size={24} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white">No applications yet</h3>
                                        <p className="text-gray-500">Wait for creators and partners to contact you.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </main>

            <CreatorModal
                isOpen={isCreatorModalOpen}
                onClose={() => setIsCreatorModalOpen(false)}
                onSubmit={handleSaveCreator}
                initialData={editingItem}
            />

            <NewsModal
                isOpen={isNewsModalOpen}
                onClose={() => setIsNewsModalOpen(false)}
                onSubmit={handleSaveNews}
                initialData={editingItem}
            />
        </div>
    );
}
