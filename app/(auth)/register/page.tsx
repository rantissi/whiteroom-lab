"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function RegisterPage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Mendaftarkan user ke dalam Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          full_name: fullName,
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // 2. Inisialisasi baris data profil baru dengan bonus gamifikasi awal
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
          id: data.user.id, 
          username: username.toLowerCase().trim(), 
          full_name: fullName,
          xp: 120, // Bonus XP awal pendaftaran
          streak: 1,
          level: 1,
          is_admin: false
        }]);

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative bg-[#09090b]">
      <div className="w-full max-w-sm z-10">
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#8b5cf6] to-[#06b6d4] rounded-xl flex items-center justify-center text-white font-bold mx-auto mb-4 pulse shadow-[0_0_24px_rgba(139,92,246,0.25)] text-lg">
            W
          </div>
          <h2 className="text-xl font-bold text-white">Create your lab</h2>
          <p className="text-zinc-500 text-sm mt-1">Free forever, upgrade when ready</p>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 space-y-4 backdrop-blur-xl">
          {error && (
            <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#8b5cf6]/50 rounded-lg px-3 py-2 text-xs text-white outline-none transition-all" 
                  placeholder="alex_chen"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#8b5cf6]/50 rounded-lg px-3 py-2 text-xs text-white outline-none transition-all" 
                  placeholder="Alex Chen"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 mb-1.5 block">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#8b5cf6]/50 rounded-lg px-3 py-2.5 text-xs text-white outline-none transition-all" 
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 mb-1.5 block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#8b5cf6]/50 rounded-lg px-3 py-2.5 text-xs text-white outline-none transition-all" 
                placeholder="At least 8 characters"
                required
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 mb-1.5 block">I'm here to</label>
              <select 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-xs text-white outline-none"
                style={{ backgroundColor: '#111113' }}
              >
                <option value="" className="text-zinc-600">Select a goal</option>
                <option value="scratch">Learn to code from scratch</option>
                <option value="level_up">Level up as a developer</option>
                <option value="switch">Switch into tech</option>
                <option value="side_project">Build a side project</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white hover:opacity-90 active:scale-[0.99] transition-all shadow-[0_0_24px_rgba(139,92,246,0.2)]"
            >
              {loading ? 'Creating account...' : 'Create account →'}
            </button>
          </form>
        </div>
        
        <p className="text-center text-xs text-zinc-600 mt-5">
          Have an account? <Link href="/login" className="text-violet-400 hover:text-violet-300">Sign in</Link>
        </p>
      </div>
    </div>
  );
}