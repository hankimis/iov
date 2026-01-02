'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
    const [pass, setPass] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pass === 'iov_admin_2024') {
            // Set simple auth cookie for demo purposes
            document.cookie = "admin_auth=true; path=/";
            router.push('/admin/dashboard');
        } else {
            alert('Invalid Password');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-[#111] border border-white/5 rounded-3xl p-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#dfff00] flex items-center justify-center text-black mb-6">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white">ADMIN ACCESS</h1>
                    <p className="text-gray-400 mt-2">IOV Management System</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-center tracking-widest text-xl focus:outline-none focus:border-[#dfff00] transition-colors"
                            placeholder="Enter Access Key"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-[#dfff00] transition-colors"
                    >
                        Authenticate
                    </button>
                </form>
            </div>
        </div>
    );
}
