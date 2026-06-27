import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { GlassCard } from '@/components/shared/GlassCard';

export const revalidate = 0;

export default async function PathsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } }
  );

  // Mengambil katalog jalur belajar aktif dari database Supabase
  const { data: pathsData } = await supabase.from('paths').select('*');

  // Data fallback premium jika tabel 'paths' di database Anda masih kosong
  const defaultPaths = pathsData && pathsData.length > 0 ? pathsData : [
    { id: "1", title: "Full-Stack React & Node", category: "Frontend", icon_emoji: "⚛️", total_modules: 8, estimated_hours: "18h", description: "Build production-grade web apps end to end. From components to deployed APIs." },
    { id: "2", title: "Python for Data & AI", category: "AI/ML", icon_emoji: "🐍", total_modules: 10, estimated_hours: "32h", description: "Learn Python from fundamentals through data science, pandas, and ML basics." },
    { id: "3", title: "AI Engineering Masterclass", category: "AI/ML", icon_emoji: "🤖", total_modules: 6, estimated_hours: "28h", description: "Build with LLMs, embeddings, RAG systems, and ship AI-native products using Groq Engine." }
  ];

  return (
    <div className="min-h-screen p-8 bg-[#09090b] text-white ml-[220px]">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Learning Paths</h1>
            <p className="text-xs text-zinc-500 mt-1">Structured journeys to industrial engineering skills</p>
          </div>
          <div className="flex gap-2 bg-white/[0.02] border border-white/5 p-1 rounded-lg text-xs">
            <span className="px-3 py-1.5 rounded-md bg-[#8b5cf6]/15 text-violet-300 border border-[#8b5cf6]/20 font-medium cursor-pointer">All Tracks</span>
            <span className="px-3 py-1.5 rounded-md text-zinc-500 hover:text-zinc-300 cursor-pointer transition-all">AI/ML</span>
            <span className="px-3 py-1.5 rounded-md text-zinc-500 hover:text-zinc-300 cursor-pointer transition-all">Engineering</span>
          </div>
        </div>

        {/* Grid Katalog Kurikulum Modul */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultPaths.map((path: any) => (
            <GlassCard key={path.id} className="cursor-pointer group flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 group-hover:scale-105 transition-all">
                    {path.icon_emoji}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold bg-[#8b5cf6]/10 text-violet-300 border border-[#8b5cf6]/15">
                    {path.category}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-p transition-colors">{path.title}</h3>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{path.description}</p>
              </div>

              <div className="mt-6 border-t border-white/[0.04] pt-4">
                <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4]" style={{ width: path.id === "1" ? "62%" : "0%" }} />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                  <span>{path.total_modules} Modules</span>
                  <span>~{path.estimated_hours} left</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </div>
  );
}