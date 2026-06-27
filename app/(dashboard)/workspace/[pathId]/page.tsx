"use client";

import { useState } from 'react';
import { GlassCard } from '@/components/shared/GlassCard';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function WorkspacePage() {
  // State Pembelajaran
  const currentLesson = "React Intro";
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  
  // State AI Chat
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey! I'm here to help with React Intro. What's on your mind? 🔬" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || aiLoading) return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    setAiLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          currentLesson: currentLesson
        })
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Error: Gagal mendapatkan respon dari Mentor AI." }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">
      
      {/* 1. ROADMAP SIDEBAR INTERNAL */}
      <aside className="w-[240px] border-r border-white/5 bg-[#111113]/50 h-screen sticky top-0 flex flex-col pt-20 px-3 overflow-y-auto scrollbar">
        <div className="text-[10px] text-zinc-600 px-3 mb-2 font-bold uppercase tracking-widest">Roadmap Flow</div>
        <div className="space-y-1">
          <div className="px-3 py-2 text-xs text-zinc-500 flex items-center gap-2 cursor-pointer hover:text-zinc-300"><span className="text-emerald-400">✓</span> HTML Fundamentals</div>
          <div className="px-3 py-2 text-xs text-zinc-500 flex items-center gap-2 cursor-pointer hover:text-zinc-300"><span className="text-emerald-400">✓</span> CSS & Flexbox</div>
          <div className="px-3 py-2 text-xs text-zinc-500 flex items-center gap-2 cursor-pointer hover:text-zinc-300"><span className="text-emerald-400">✓</span> JS Basics</div>
          <div className="px-3 py-2 text-xs text-violet-300 flex items-center gap-2 cursor-pointer font-medium bg-[#8b5cf6]/10 rounded-md border border-[#8b5cf6]/15"><span>→</span> React Intro</div>
          <div className="px-3 py-2 text-xs text-zinc-600 flex items-center gap-2 cursor-pointer hover:text-zinc-400"><span className="opacity-40">○</span> State & Effects</div>
          <div className="px-3 py-2 text-xs text-zinc-600 flex items-center gap-2 cursor-pointer hover:text-zinc-400"><span className="opacity-40">○</span> Node.js & APIs</div>
        </div>
      </aside>

      {/* 2. MAIN READING & EXERCISE LAB */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto scrollbar">
        {/* Top Control Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#09090b]/80 border-b border-white/5 backdrop-blur-md sticky top-0 z-10">
          <div>
            <div className="text-sm font-semibold text-white">{currentLesson}</div>
            <div className="text-[10px] text-zinc-500 font-medium">Module 4 · Lesson 1 of 6</div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/5 bg-white/5 hover:bg-white/10 transition-all">Notes</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-[0_0_12px_rgba(139,92,246,0.2)]">Mark Done ✓</button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-w-3xl space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-3 text-white">What is React?</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              React is a JavaScript library for building user interfaces. It was developed by Meta and has become one of the most popular tools for frontend development. React lets you compose complex UIs from small, reusable pieces of code called components.
            </p>
          </div>

          <GlassCard variant="purple">
            <div className="text-[10px] text-violet-400 mb-1.5 font-bold tracking-widest font-mono">CONCEPT</div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              A <strong className="text-white">component</strong> is a JavaScript function that returns UI structure. Think of it like a custom HTML element you define yourself — you can reuse it anywhere.
            </p>
          </GlassCard>

          {/* IDE Code Block Aesthetics */}
          <div className="rounded-xl border border-white/5 overflow-hidden bg-[#0d0d0f]">
            <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/5 text-[11px] font-mono text-zinc-500">
              <span>components/Greeting.jsx</span>
              <span className="text-violet-400 font-semibold uppercase">React</span>
            </div>
            <pre className="p-4 text-xs font-mono text-zinc-300 leading-relaxed overflow-x-auto select-text bg-[#09090b]/40">
{`function Greeting({ name }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}

export default Greeting;`}
            </pre>
          </div>

          {/* Dynamic Checkbox Quiz Option ala Duolingo */}
          <div className="bg-white/[0.01] border border-white/5 rounded-xl p-5">
            <div className="text-sm font-semibold text-zinc-200 mb-1">Quick check</div>
            <div className="text-xs text-zinc-400 mb-4">Which of the following best describes a React component?</div>
            <div className="space-y-2">
              {[
                "A CSS class that styles structural layouts",
                "A reusable JavaScript function that yields UI via JSX",
                "A backend database optimization query handler"
              ].map((option, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedQuiz(idx)}
                  className={`px-4 py-3 rounded-lg text-xs text-zinc-400 cursor-pointer border transition-all ${
                    selectedQuiz === idx 
                      ? 'border-[#8b5cf6] bg-[#8b5cf6]/5 text-violet-300 font-medium' 
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10 text-zinc-400'
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MENTOR AI FLOATING SIDE-TERMINAL */}
      <div className="w-[300px] border-l border-white/5 flex flex-col h-screen sticky top-0 bg-[#09090b]">
        <div className="p-4 border-b border-white/5 bg-white/[0.01]">
          <div className="text-xs text-zinc-200 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse"></span>
            Mentor AI Copilot
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">Groq Accelerated Inference</div>
        </div>

        {/* Live Conversation Stream Section */}
        <div className="flex-1 overflow-y-auto scrollbar p-4 space-y-4">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-xl text-xs leading-relaxed max-w-[90%] border ${
                m.role === 'assistant' 
                  ? 'bg-[#8b5cf6]/5 border-[#8b5cf6]/15 text-zinc-300 mr-auto rounded-tl-none' 
                  : 'bg-[#06b6d4]/5 border-[#06b6d4]/15 text-zinc-300 ml-auto rounded-tr-none'
              }`}
            >
              <div className="font-bold text-[10px] mb-1 uppercase tracking-wider text-zinc-500">
                {m.role === 'assistant' ? 'AI Mentor' : 'You'}
              </div>
              <p className="whitespace-pre-line font-sans select-text">{m.content}</p>
            </div>
          ))}
          {aiLoading && (
            <div className="text-zinc-600 text-[11px] italic font-mono animate-pulse">
              Architect is assembling lines of intelligence...
            </div>
          )}
        </div>

        {/* Terminal Text Input Box */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-white/5 bg-white/[0.01]">
          <div className="flex gap-2">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-[#111113] border border-white/5 focus:border-[#8b5cf6]/50 rounded-lg px-3 py-2 text-xs text-white outline-none transition-all placeholder:text-zinc-600"
              placeholder="Ask anything about this lesson..."
              disabled={aiLoading}
            />
            <button 
              type="submit"
              className="px-3 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.2)]"
              disabled={aiLoading}
            >
              ↑
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}