import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { GlassCard } from '@/components/shared/GlassCard';

export const revalidate = 0; // Memastikan interaksi feed & ranking selalu up-to-date

export default async function DiscussLabPage() {
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

  // 1. Validasi Sesi Pengguna
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  // 2. Ambil Data Postingan Diskusi Terbaru
  const { data: dbPosts } = await supabase
    .from('posts')
    .select('*, profiles(username, full_name)')
    .order('created_at', { ascending: false })
    .limit(10);

  // Fallback data postingan premium sesuai dengan visual index.html Anda
  const defaultFeed = dbPosts && dbPosts.length > 0 ? dbPosts : [
    {
      id: "p1",
      content: 'Finally clicked why useEffect runs after render and not before. The mental model that helped: the browser needs to paint first, THEN you can react to it. Anyone else have a "useEffect moment"? 😅',
      tag: "React",
      likes_count: 34,
      replies_count: 12,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      profiles: { username: "jess_kim", full_name: "Jess Kim" }
    },
    {
      id: "p2",
      content: "Hot take: learning git before anything else saved me hours of pain. Which foundational skill do you wish you'd learned earlier?",
      tag: "Git",
      likes_count: 87,
      replies_count: 31,
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      profiles: { username: "marcus_r", full_name: "Marcus R." }
    }
  ];

  // 3. Ambil Data Peringkat Pengguna Teratas (Leaderboard) Berdasarkan XP
  const { data: leaderboardData } = await supabase
    .from('profiles')
    .select('username, xp, streak')
    .order('xp', { ascending: false })
    .limit(3);

  // Ambil data profil user saat ini untuk diletakkan di baris khusus leaderboard
  const { data: currentUserProfile } = await supabase
    .from('profiles')
    .select('username, xp, rank_position')
    .eq('id', session.user.id)
    .single();

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex ml-[220px]">
      
      {/* SEKTOR TENGAH: LIVE DISCUSSION FEED */}
      <div className="flex-1 border-r border-white/5 flex flex-col h-screen overflow-y-auto scrollbar">
        {/* Sticky Feed Header Navigation */}
        <div className="sticky top-0 bg-[#09090b]/80 border-b border-white/5 px-6 py-4 flex items-center justify-between z-10 backdrop-blur-md">
          <div className="flex gap-4 text-xs font-medium">
            <span className="text-white cursor-pointer border-b-2 border-[#8b5cf6] pb-1 font-semibold">Feed Lab</span>
            <span className="text-zinc-500 cursor-pointer pb-1 hover:text-white transition-all">Trending Topics</span>
            <span className="text-zinc-500 cursor-pointer pb-1 hover:text-white transition-all">Groups Pod</span>
          </div>
          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white hover:opacity-90 shadow-[0_0_12px_rgba(139,92,246,0.2)]">
            + Write Post
          </button>
        </div>

        {/* List Card Container */}
        <div className="p-6 space-y-4 max-w-2xl w-full mx-auto">
          {defaultFeed.map((post: any) => (
            <GlassCard key={post.id} className="p-5">
              <div className="flex gap-3 mb-3">
                {/* Avatar Inisial Bulat */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center font-bold text-xs text-white shadow-sm flex-shrink-0">
                  {post.profiles?.full_name?.substring(0, 2).toUpperCase() || "AC"}
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-200">
                    {post.profiles?.full_name}{' '}
                    <span className="text-[10px] text-zinc-600 font-normal ml-1">
                      · {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium mt-0.5">Track Module · {post.tag}</div>
                </div>
              </div>

              {/* Isi Konten Diskusi */}
              <p className="text-xs text-zinc-300 leading-relaxed mb-4 select-text font-sans">
                {post.content}
              </p>

              {/* Tombol Aksi Reaksi Sosial */}
              <div className="flex items-center gap-5 text-[10px] text-zinc-500 font-medium">
                <span className="cursor-pointer hover:text-red-400 transition-colors flex items-center gap-1">
                  ♥ <span className="font-semibold">{post.likes_count}</span>
                </span>
                <span className="cursor-pointer hover:text-[#8b5cf6] transition-colors flex items-center gap-1">
                  💬 <span className="font-semibold">{post.replies_count} replies</span>
                </span>
                <span className="cursor-pointer hover:text-zinc-300 transition-colors">↗ Share</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* SEKTOR KANAN: LEADERBOARD & SYNDICATE GROUPS MONITOR */}
      <div className="w-[260px] p-5 space-y-6 h-screen sticky top-0 overflow-y-auto scrollbar bg-bg">
        
        {/* 1. SEKTOR LEADERBOARD INTEGRATED GAMIFICATION */}
        <div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3">Leaderboard Tier</div>
          <div className="space-y-2">
            
            {/* Merender 3 Top User Teratas dari DB */}
            {leaderboardData?.map((user: any, index: number) => (
              <div 
                key={index} 
                className={`flex items-center gap-2.5 p-2 rounded-lg border ${
                  index === 0 
                    ? 'bg-yellow-500/5 border-yellow-500/10' 
                    : 'bg-white/[0.01] border-white/5'
                }`}
              >
                <span className={`text-xs font-bold w-4 text-center ${index === 0 ? 'text-yellow-400' : 'text-zinc-500'}`}>
                  #{index + 1}
                </span>
                <div className="w-5 h-5 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-[9px] font-bold uppercase text-zinc-400">
                  {user.username.substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-zinc-300 truncate">@{user.username}</div>
                </div>
                <div className="text-[10px] text-[#8b5cf6] font-bold font-mono">{user.xp} XP</div>
              </div>
            ))}

            {/* Baris Khusus Data Diri Sendiri (Current Active User) */}
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#8b5cf6]/5 border border-[#8b5cf6]/15 mt-3 shadow-[0_0_12px_rgba(139,92,246,0.1)]">
              <span className="text-xs font-bold text-violet-300 w-4 text-center">
                #{currentUserProfile?.rank_position || 142}
              </span>
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-[9px] font-bold text-white">
                ME
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-violet-300 truncate">You</div>
              </div>
              <div className="text-[10px] text-[#8b5cf6] font-extrabold font-mono">
                {currentUserProfile?.xp || 4820} XP
              </div>
            </div>

          </div>
        </div>

        {/* 2. SEKTOR SYNDICATE LEARNING POD / GROUPS */}
        <div className="border-t border-white/5 pt-4">
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3">Syndicate Pods</div>
          <div className="space-y-1.5">
            {[
              { emoji: "⚛️", name: "React Builders" },
              { emoji: "🐍", name: "Python Network" },
              { emoji: "🤖", name: "AI Core Architects" },
              { emoji: "🌱", name: "Alpha Beginners" }
            ].map((group, gIdx) => (
              <div 
                key={gIdx} 
                className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-zinc-400 hover:text-zinc-200"
              >
                <span className="text-sm">{group.emoji}</span>
                <span className="text-xs font-medium">{group.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}