"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '⚡' },
  { name: 'Workspace', href: '/workspace', icon: '🔬' },
  { name: 'Paths', href: '/paths', icon: '🗺️' },
  { name: 'Projects', href: '/projects', icon: '📦' },
  { name: 'DiscussLab', href: '/discuss', icon: '💬' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  if (pathname === '/' || pathname === '/login' || pathname === '/register' || pathname.startsWith('/admin')) return null;

  return (
    <aside className="w-[220px] min-h-screen border-r border-white/5 bg-bg flex flex-col py-5 px-3 fixed left-0 top-0 z-40">
      <div className="flex items-center gap-2.5 px-3 mb-6">
        <div className="w-7 h-7 bg-gradient-to-tr from-[#8b5cf6] to-[#06b6d4] rounded-lg flex items-center justify-center text-white font-bold text-xs pulse">W</div>
        <span className="font-semibold text-sm text-white">WhiteRoom Lab</span>
      </div>
      
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href} className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-zinc-500 hover:bg-white/5 hover:text-zinc-200", isActive && "bg-[#8b5cf6]/12 text-[#c4b5fd] border border-[#8b5cf6]/20")}>
              <span>{item.icon}</span><span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};