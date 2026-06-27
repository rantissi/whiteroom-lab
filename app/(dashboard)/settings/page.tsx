import { GlassCard } from '@/components/shared/GlassCard';

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-8 bg-[#09090b] text-white ml-[220px]">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <p className="text-xs text-zinc-500 mt-1">Configure account variables, aesthetics, and synchronization</p>
        </div>

        {/* SEKTOR KARTU 1: DATA AKUN UTAMA */}
        <GlassCard className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-p">Identity & Credentials</h3>
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-2">
            <div>
              <div className="text-xs font-medium text-zinc-200">Public Display Name</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Identifiable tag inside the DiscussLab feed routing</div>
            </div>
            <input 
              type="text" 
              className="bg-[#111113] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white outline-none w-48 focus:border-p/50"
              defaultValue="Alex Chen"
            />
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-xs font-medium text-zinc-200">Security Key Passphrase</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Cycle update authentication crypt token</div>
            </div>
            <button className="px-3 py-1.5 rounded-md border border-white/5 bg-white/5 hover:bg-white/10 text-[11px] font-medium transition-all text-zinc-300">
              Update Password
            </button>
          </div>
        </GlassCard>

        {/* SEKTOR KARTU 2: KUSTOMISASI VISUAL APPEARANCE */}
        <GlassCard className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-c">Aesthetics Interface</h3>
          
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-xs font-medium text-zinc-200">Default Theme Environment</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">High-contrast minimalist coding workspace mode</div>
            </div>
            <div className="flex gap-1.5 bg-[#111113] p-1 border border-white/5 rounded-lg text-[10px] font-semibold">
              <span className="px-2.5 py-1 rounded bg-[#8b5cf6]/15 text-violet-300 border border-[#8b5cf6]/10">Dark Engine</span>
              <span className="px-2.5 py-1 text-zinc-600 cursor-not-allowed">Light Mode</span>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-xs font-medium text-zinc-200">Primary Color Highlight Accent</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">System-wide glowing ambient highlight engine color</div>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full cursor-pointer ring-2 ring-white ring-offset-2 ring-offset-[#09090b]" style={{ backgroundColor: '#8b5cf6' }} />
              <div className="w-5 h-5 rounded-full cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: '#06b6d4' }} />
              <div className="w-5 h-5 rounded-full cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: '#10b981' }} />
              <div className="w-5 h-5 rounded-full cursor-pointer hover:scale-105 transition-transform" style={{ backgroundColor: '#f59e0b' }} />
            </div>
          </div>
        </GlassCard>

        {/* SEKTOR KARTU 3: NOTIFIKASI REMINDER */}
        <GlassCard className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Synchronization & Push Reminders</h3>
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-xs font-medium text-zinc-200">Daily Streak Expiry Warning</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Receive alert boundaries before losing your active continuous streak</div>
            </div>
            {/* Toggle Button Mock Visual */}
            <div className="w-8 h-4 rounded-full p-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] flex justify-end cursor-pointer">
              <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </GlassCard>

        {/* ACTION SUBMIT BLOCK */}
        <div className="flex justify-end gap-3 pt-2">
          <button className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white hover:opacity-90 transition-all shadow-[0_0_16px_rgba(139,92,246,0.2)]">
            Save Operational Changes
          </button>
        </div>

      </div>
    </div>
  );
}