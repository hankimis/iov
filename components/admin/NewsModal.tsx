'use client';

import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export default function NewsModal({ isOpen, onClose, onSubmit, initialData }: NewsModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'NOTICE',
        date: new Date().toISOString().split('T')[0],
        desc: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: '',
                category: 'NOTICE',
                date: new Date().toISOString().split('T')[0],
                desc: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
                    <h3 className="text-xl font-bold text-white">
                        {initialData ? 'Edit News' : 'Write News'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                            <select
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#dfff00]"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                {['NOTICE', 'TECH', 'PARTNERSHIP', 'BUSINESS', 'EVENT'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Date</label>
                            <input
                                required
                                type="date"
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#dfff00]"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#dfff00]"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#dfff00] resize-none"
                            value={formData.desc}
                            onChange={e => setFormData({ ...formData, desc: e.target.value })}
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-[#dfff00] hover:bg-[#ccee00] text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> {initialData ? 'Update' : 'Publish'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
