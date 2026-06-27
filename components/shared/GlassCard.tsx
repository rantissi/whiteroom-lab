import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'purple' | 'cyan';
}

export const GlassCard = ({ children, className, variant = 'default', ...props }: GlassCardProps) => {
  const styles = {
    default: 'bg-white/[0.02] border-white/[0.06] hover:border-[#8b5cf6]/25',
    purple: 'bg-[#8b5cf6]/[0.06] border-[#8b5cf6]/15 hover:border-[#8b5cf6]/40 shadow-[0_0_24px_rgba(139,92,246,0.15)]',
    cyan: 'bg-[#06b6d4]/[0.06] border-[#06b6d4]/15 hover:border-[#06b6d4]/40 shadow-[0_0_24px_rgba(6,182,212,0.1)]'
  };

  return (
    <div className={cn("backdrop-blur-xl border rounded-xl p-5 transition-all duration-200 ease-out", styles[variant], className)} {...props}>
      {children}
    </div>
  );
};