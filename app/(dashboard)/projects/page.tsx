import { GlassCard } from '@/components/shared/GlassCard';

export default function ProjectsPage() {
  const shippedProjects = [
    {
      title: "Arkvyl Core Platform",
      desc: "Personal portfolio and open tech infrastructure platform built with Next.js and integrated HTTPS SSL setups.",
      tags: ["React", "Tailwind", "Next.js"],
      status: "Live"
    },
    {
      title: "TaskFlow Backend API",
      desc: "Robust REST API with modular authorization architecture built with Node.js and scalable PostgreSQL pools.",
      tags: ["Node.js", "Postgres", "WIP"],
      status: "WIP"
    }
  ];

  return (
    <div className="min-h-screen p-8 bg-[#09090b] text-white ml-[220px]">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Project Showcase</h1>
            <p className="text-xs text-zinc-500 mt-1">Deploy, display, and audit production-ready tech artifacts</p>
          </div>
          <button className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white hover:opacity-95 shadow-[0_0_16px_rgba(139,92,246,0.2)] transition-all">
            + New Project Artifact
          </button>
        </div>

        {/* Grid Portofolio Terdistribusi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shippedProjects.map((p, idx) => (
            <GlassCard key={idx} className="flex flex-col justify-between">
              <div>
                {/* Visual Placeholder Space */}
                <div className="h-28 rounded-lg mb-4 flex items-center justify-center text-3xl bg-gradient-to-tr from-p/10 to-c/5 border border-white/5">
                  {idx === 0 ? "🌐" : "📝"}
                </div>
                <h4 className="text-sm font-semibold text-zinc-200">{p.title}</h4>
                <p className="text-[11px] text-zinc-500 mt-1.5 leading-relaxed">{p.desc}</p>
                
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {p.tags.map((t, tIdx) => (
                    <span key={tIdx} className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 font-medium border border-white/5">
                      {t}
                    </span>
                  ))}
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${p.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {p.status}
                  </span>
                </div>
              </div>

              {/* Action Button Trigger Links */}
              <div className="flex gap-2 mt-5 border-t border-white/[0.04] pt-3">
                <button className="flex-1 py-1.5 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-zinc-300">
                  Demo Live
                </button>
                <button className="flex-1 py-1.5 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-zinc-300">
                  Codebase
                </button>
              </div>
            </GlassCard>
          ))}

          {/* Dotted Import Box Placeholder */}
          <div className="border border-dashed border-white/10 hover:border-p/30 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px] bg-white/[0.005] transition-all group">
            <span className="text-2xl text-zinc-600 group-hover:scale-110 transition-transform mb-2">+</span>
            <div className="text-xs font-medium text-zinc-400">Import Repository</div>
            <div className="text-[10px] text-zinc-600 mt-0.5">Connect GitHub workspace directly</div>
          </div>
        </div>

      </div>
    </div>
  );
}