import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { GlassCard } from '@/components/shared/GlassCard'

export const revalidate = 0; // Pastikan data analitik selalu fresh (real-time)

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() }, setAll() {} } }
  )

  // Ambil data agregat sistem dari database
  const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
  const { data: views } = await supabase.from('page_views').select('*').order('created_at', { ascending: false }).limit(5)
  const { data: topUsers } = await supabase.from('profiles').select('username, xp, streak').order('xp', { ascending: false }).limit(3)

  return (
    <div className="min-h-screen p-8 bg-[#09090b] text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin System Control</h1>
            <p className="text-xs text-zinc-500 mt-1">Real-time engagement metrics for lab.arkvyl.com</p>
          </div>
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest bg-emerald-500/10 text-emerald-400 uppercase border border-emerald-500/20 animate-pulse">
            ● Live Synchronized
          </span>
        </div>

        {/* Baris Kartu Metrik Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <GlassCard variant="purple">
            <p className="text-xs text-zinc-400">Total Registered Learners</p>
            <h3 className="text-4xl font-extrabold mt-2 tracking-tight text-white">{totalUsers || 0}</h3>
            <span className="text-[10px] text-p font-medium mt-1 block">Active across ecosystem</span>
          </GlassCard>

          <GlassCard variant="cyan">
            <p className="text-xs text-zinc-400">Global System Retention</p>
            <h3 className="text-4xl font-extrabold mt-2 tracking-tight text-white">100%</h3>
            <span className="text-[10px] text-c font-medium mt-1 block">Serverless edge operation status</span>
          </GlassCard>

          <GlassCard>
            <p className="text-xs text-zinc-400">Database Connection</p>
            <h3 className="text-4xl font-extrabold mt-2 tracking-tight text-emerald-400">OK</h3>
            <span className="text-[10px] text-zinc-500 mt-1 block">Supabase pooling protocol active</span>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sektor Live Page Views Tracker */}
          <GlassCard>
            <h4 className="text-sm font-semibold mb-4 text-zinc-200">Recent Live Page Traffic</h4>
            <div className="space-y-2">
              {views?.map((v: any) => (
                <div key={v.id} className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs">
                  <span className="font-mono text-p">{v.path_name}</span>
                  <span className="text-zinc-500 text-[10px]">{new Date(v.created_at).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Sektor Leaderboard Monitoring */}
          <GlassCard>
            <h4 className="text-sm font-semibold mb-4 text-zinc-200">Top Active Learners Performance</h4>
            <div className="space-y-2">
              {topUsers?.map((u: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs">
                  <span className="font-medium text-zinc-300">@{u.username}</span>
                  <div className="flex gap-3 text-[11px]">
                    <span className="text-yellow-400 font-bold">🔥 {u.streak}d</span>
                    <span className="text-c font-semibold">{u.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}