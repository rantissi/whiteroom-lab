import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { GlassCard } from '@/components/shared/GlassCard';

export const revalidate = 0;

export default async function ProfilePage() {
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

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  const userMetrics = profile || {
    username: session.user.user_metadata?.username || 'learner_dev',
    full_name: session.user.user_metadata?.full_name || 'Anonymous Learner',
    xp: 4820,
    streak: 14,
    level: 12,
    rank_position: 142,
    created_at: new Date().toISOString()
  };

  return (
    <div className="min-h-screen p-8 bg-[#09090b] text-white ml-[220px]">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* BIG HERO GLASS CARD AREA */}
        <div className="relative border border-white/[0.06] rounded-xl p-8 bg-white/[0.01] overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 opacity-25 bg-gradient-to-tr from-[#8b5cf6]/20 to-transparent pointer-events-none" />
          
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Profile Avatar Emblem */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-white font-extrabold text-xl shadow-[0_0_24px_rgba(139,92,246,0.25)]">
                {userMetrics.full_name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{userMetrics.full_name}</h2>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">@{userMetrics.username} · Member since 2026</p>
                <p className="text-xs text-zinc-400 mt-3 max-w-sm leading-relaxed">
                  Building automated systems, refining react hooks architectures, and shifting compiler structures inside the lab.
                </p>
              </div>
            </div>

            {/* Right Side Stacked Metrics */}
            <div className="sm:text-right border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-center gap-2">
              <div>
                <div className="text-2xl font-extrabold grad-text font-mono">{userMetrics.xp.toLocaleString()}</div>
                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Total Accumulated XP</div>
              </div>
              <div className="sm:mt-2">
                <div className="text-sm font-bold text-zinc-200">Global Rank #{userMetrics.rank_position}</div>
                <div className="text-[10px] text-zinc-600 font-medium">System Performance Positioning</div>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS ROW TRIPLE SPLIT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlassCard className="text-center p-4">
            <div className="text-xl font-bold text-white font-mono">23</div>
            <div className="text-[10px] text-zinc-500 mt-1 uppercase font-medium tracking-wider">Lessons Executed</div>
          </GlassCard>
          <GlassCard className="text-center p-4">
            <div className="text-xl font-bold text-orange-400 font-mono">{userMetrics.streak} Days</div>
            <div className="text-[10px] text-zinc-500 mt-1 uppercase font-medium tracking-wider">Active Run Streak</div>
          </GlassCard>
          <GlassCard className="text-center p-4">
            <div className="text-xl font-bold text-[#06b6d4] font-mono">2 Shipped</div>
            <div className="text-[10px] text-zinc-500 mt-1 uppercase font-medium tracking-wider">Verified Projects</div>
          </GlassCard>
        </div>

        {/* ACHIEVEMENTS GRID WRAPPER */}
        <GlassCard>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Cryptographic Badges</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "🚀", title: "First Launch", desc: "Initialized lab account", active: true, var: "purple" },
              { icon: "🔥", title: "14-Day Fire", desc: "Maintained run streak", active: true, var: "cyan" },
              { icon: "💬", title: "Contributor", desc: "Shared engineering signal", active: true, var: "purple" },
              { icon: "🧠", title: "Deep Thinker", desc: "Solve 50 algorithm modules", active: false, var: "default" }
            ].map((badge, bIdx) => (
              <div 
                key={bIdx} 
                className={`p-4 rounded-xl border flex flex-col items-center text-center justify-center transition-all duration-200 ${
                  badge.active 
                    ? badge.var === 'purple' 
                      ? 'bg-[#8b5cf6]/5 border-[#8b5cf6]/15 text-zinc-200' 
                      : 'bg-[#06b6d4]/5 border-[#06b6d4]/15 text-zinc-200'
                    : 'bg-white/[0.01] border-white/5 opacity-30'
                }`}
              >
                <span className="text-2xl mb-1.5">{badge.icon}</span>
                <div className="text-xs font-semibold">{badge.title}</div>
                <div className="text-[9px] text-zinc-500 mt-0.5 leading-tight">{badge.desc}</div>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>
    </div>
  );
}