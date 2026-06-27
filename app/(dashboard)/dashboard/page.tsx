import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { GlassCard } from '@/components/shared/GlassCard';

export const revalidate = 0; // Memastikan data kemajuan (XP/Streak) selalu diperbarui

export default async function DashboardPage() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {}
      },
    }
  );

  // 1. Ambil data sesi user aktif
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }

  // 2. Ambil data profil terintegrasi dari database
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  // Jika baris data profil belum terbuat sempurna, gunakan data fallback aman
  const userMetrics = profile || {
    full_name: session.user.user_metadata?.full_name || 'Learner',
    streak: 1,
    xp: 100,
    level: 1,
    rank_position: 142
  };

  return (
    <div className="min-h-screen p-8 bg-[#09090b] text-white ml-[220px]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Ucapan & Ringkasan Streak */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Good morning, {userMetrics.full_name} 👋</h1>
            <p className="text-zinc-500 text-sm mt-1">Day {userMetrics.streak} of your streak — keep it up</p>
          </div>
          <div className="bg-[#8b5cf6]/[0.06] border border-[#8b5cf6]/15 px-4 py-2 rounded-xl flex items-center gap-3 shadow-[0_0_16px_rgba(139,92,246,0.15)]">
            <span className="text-orange-400 text-lg">🔥</span>
            <div>
              <div className="text-lg font-bold text-violet-300">{userMetrics.streak}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">day streak</div>
            </div>
          </div>
        </div>

        {/* Grid Kartu Utama Gamifikasi Skala Makro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <GlassCard>
            <div className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Total Accumulation XP</div>
            <div className="text-3xl font-extrabold grad-text mt-1.5">{userMetrics.xp.toLocaleString()}</div>
            <div className="text-[10px] text-zinc-600 mt-1">↑ 340 completed this week</div>
          </GlassCard>

          <GlassCard>
            <div className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Current Tier Level</div>
            <div className="text-3xl font-extrabold text-white mt-1.5">Lvl {userMetrics.level}</div>
            <div className="text-[10px] text-p font-medium mt-1">Advanced Playground System</div>
          </GlassCard>

          <GlassCard>
            <div className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Global Rank</div>
            <div className="text-3xl font-extrabold text-[#06b6d4] mt-1.5">#{userMetrics.rank_position}</div>
            <div className="text-[10px] text-zinc-600 mt-1">↑ 18 spots surged this cycle</div>
          </GlassCard>
        </div>

        {/* Struktur Sesi Belajar yang Sedang Aktif & Rekap Mingguan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <GlassCard variant="purple">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-zinc-200">Current Execution Path</div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#8b5cf6]/10 text-violet-300 border border-[#8b5cf6]/20 uppercase">
                In progress
              </span>
            </div>
            <div className="text-xs text-zinc-400 font-medium mb-1">Full-Stack Engineering Framework</div>
            
            {/* Bar Kemajuan Visual ala Duolingo */}
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mt-3 mb-2 border border-white/[0.02]">
              <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full" style={{ width: '62%' }} />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>Module 4 of 8</span>
              <span>62% Complete</span>
            </div>
            
            <a href="/workspace/full-stack-path" className="w-full text-center py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white block mt-4 hover:opacity-90 transition-all shadow-[0_0_12px_rgba(139,92,246,0.2)]">
              Continue Lab Experiment →
            </a>
          </GlassCard>

          <GlassCard>
            <div className="text-sm font-semibold mb-4 text-zinc-200">Weekly Consistency Target</div>
            <div className="flex gap-2 flex-wrap justify-between">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                const active = idx === 4; // Menandai hari ini (Jumat) aktif
                const done = idx < 4;     // Hari Senin-Kamis selesai
                return (
                  <div 
                    key={idx} 
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${
                      active 
                        ? 'bg-gradient-to-tr from-[#8b5cf6] to-[#06b6d4] text-white shadow-[0_0_12px_rgba(139,92,246,0.3)] border-transparent' 
                        : done 
                          ? 'bg-[#8b5cf6]/20 text-[#a78bfa] border-[#8b5cf6]/30' 
                          : 'bg-white/[0.03] text-zinc-600 border-white/[0.04]'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[#8b5cf6]/[0.04] border border-[#8b5cf6]/10">
              <div className="text-xs text-violet-300 font-medium">🏆 On track for a 21-day cryptographic badge!</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Maintain execution consistency for 7 more days to unlock.</div>
            </div>
          </GlassCard>
        </div>

        {/* Bagian Pencapaian Sistem (Badges) */}
        <GlassCard>
          <div className="text-sm font-semibold mb-4 text-zinc-200">Unlocked Badges & Credentials</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#8b5cf6]/5 border border-[#8b5cf6]/10 text-center">
              <span className="text-2xl">🚀</span>
              <span className="text-[11px] font-medium text-zinc-300">First Launch</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#06b6d4]/5 border border-[#06b6d4]/10 text-center">
              <span className="text-2xl">🔥</span>
              <span className="text-[11px] font-medium text-zinc-300">14-Day Streak</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#8b5cf6]/5 border border-[#8b5cf6]/10 text-center">
              <span className="text-2xl">💬</span>
              <span className="text-[11px] font-medium text-zinc-300">Contributor</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center opacity-40">
              <span className="text-2xl">🧠</span>
              <span className="text-[11px] font-medium text-zinc-500">Deep Thinker</span>
            </div>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}