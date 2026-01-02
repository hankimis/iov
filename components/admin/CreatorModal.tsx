'use client';

import { useState, useEffect } from 'react';
import { X, Save, Upload } from 'lucide-react';
import Image from 'next/image';

interface CreatorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}

export default function CreatorModal({ isOpen, onClose, onSubmit, initialData }: CreatorModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Beauty',
        followers: '',
        platform: 'TikTok',
        image: '',
        link: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                link: initialData.link || ''
            });
        } else {
            setFormData({
                name: '',
                category: 'Beauty',
                followers: '',
                platform: 'TikTok',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
                link: ''
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
                        {initialData ? 'Edit Creator' : 'Add New Creator'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#dfff00]"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Followers</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#dfff00]"
                                placeholder="1.2M"
                                value={formData.followers}
                                onChange={e => setFormData({ ...formData, followers: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                            <select
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#dfff00]"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                {['Beauty', 'Gaming', 'Fashion', 'Food', 'Dance', 'Vlog', 'Tech', 'Music'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Platform</label>
                            <select
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#dfff00]"
                                value={formData.platform}
                                onChange={e => setFormData({ ...formData, platform: e.target.value })}
                            >
                                <option value="TikTok">TikTok</option>
                                <option value="YouTube">YouTube</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Twitch">Twitch</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Profile Image</label>
                        <div className="flex flex-col gap-4">
                            {/* Upload Area */}
                            <div className="relative border-2 border-dashed border-white/10 rounded-lg p-6 hover:border-[#dfff00]/50 transition-colors text-center group cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={async (e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            const file = e.target.files[0];
                                            const uploadData = new FormData();
                                            uploadData.append('file', file);

                                            // Show uploading state if needed
                                            try {
                                                const res = await fetch('/api/upload', {
                                                    method: 'POST',
                                                    body: uploadData
                                                });
                                                const data = await res.json();
                                                if (data.url) {
                                                    setFormData({ ...formData, image: data.url });
                                                }
                                            } catch (err) {
                                                alert('Upload failed');
                                            }
                                        }
                                    }}
                                />
                                <Upload className="mx-auto text-gray-500 group-hover:text-[#dfff00] mb-2" size={24} />
                                <p className="text-xs text-gray-400">Click or Drag & Drop to Upload</p>
                            </div>

                            {/* Manual Link Input (Optional) - allow relative paths, so use text instead of url */}
                            <input
                                type="text"
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#dfff00] text-xs"
                                placeholder="Or enter image URL or /uploads/filename..."
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>
                        {formData.image && (
                            <div className="mt-4 w-full h-40 rounded-lg overflow-hidden bg-black/50 border border-white/5 relative">
                                <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, image: '' })}
                                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Social Link URL</label>
                        <input
                            type="url"
                            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#dfff00]"
                            placeholder="https://instagram.com/..."
                            value={formData.link}
                            onChange={e => setFormData({ ...formData, link: e.target.value })}
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
                            <Save size={18} /> {initialData ? 'Update Creator' : 'Add Creator'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
