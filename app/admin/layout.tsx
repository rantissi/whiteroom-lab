import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Sidebar khusus admin bisa diletakkan di sini ke depannya */}
      <div className="flex">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}