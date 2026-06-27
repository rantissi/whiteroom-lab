import './globals.css';
import { Sidebar } from '@/components/shared/Sidebar';
import { PageTracker } from '@/components/PageTracker';

export const metadata = {
  title: 'WhiteRoom Lab',
  description: 'AI Learning Ecosystem & Admin Portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="noise" />
        <PageTracker />
        
        {/* Ambient background orbs */}
        <div className="fixed w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#8b5cf6]/10 to-transparent -top-[200px] -right-[200px] pointer-events-none z-0" />
        <div className="fixed w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#06b6d4]/10 to-transparent -bottom-[150px] -left-[100px] pointer-events-none z-0" />

        <div className="flex min-h-screen relative z-10">
          <Sidebar />
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}