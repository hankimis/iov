'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, Home, Briefcase, Mail, Users, FileText, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                        <Command label="Global Command Menu" className="w-full">
                            <div className="flex items-center border-b border-white/10 px-4">
                                <Search className="w-5 h-5 text-gray-500 mr-2" />
                                <Command.Input
                                    placeholder="Type a command or search..."
                                    className="w-full h-14 bg-transparent text-white focus:outline-none text-lg placeholder:text-gray-500"
                                />
                            </div>

                            <Command.List className="max-h-[300px] overflow-y-auto p-2">
                                <Command.Empty className="py-6 text-center text-gray-500">No results found.</Command.Empty>

                                <Command.Group heading="Pages" className="text-xs font-bold text-gray-500 mb-2 px-2">
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/'))}
                                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors text-sm mb-1 aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <Home size={16} /> Home
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/about'))}
                                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors text-sm mb-1 aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <Users size={16} /> About Us
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/business'))}
                                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors text-sm mb-1 aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <Briefcase size={16} /> Business Area
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/creators'))}
                                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors text-sm mb-1 aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <User size={16} /> Creators
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/contact'))}
                                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors text-sm mb-1 aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <Mail size={16} /> Contact
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/recruit'))}
                                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors text-sm mb-1 aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <FileText size={16} /> Recruit
                                    </Command.Item>
                                </Command.Group>

                                <Command.Group heading="Admin" className="text-xs font-bold text-gray-500 mb-2 px-2 mt-4">
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/admin/dashboard'))}
                                        className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors text-sm mb-1 aria-selected:bg-white/10 aria-selected:text-white"
                                    >
                                        <User size={16} /> Admin Dashboard
                                    </Command.Item>
                                </Command.Group>

                                <Command.Group heading="Theme" className="text-xs font-bold text-gray-500 mb-2 px-2 mt-4">
                                    <div className="px-3 py-2 text-xs text-gray-600">Dark Mode Only (System Default)</div>
                                </Command.Group>
                            </Command.List>

                            <div className="border-t border-white/10 px-4 py-2 flex justify-between items-center text-[10px] text-gray-500">
                                <div className="flex gap-2">
                                    <span>↑↓ Select</span>
                                    <span>↵ Open</span>
                                </div>
                                <span>ESC to close</span>
                            </div>
                        </Command>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
