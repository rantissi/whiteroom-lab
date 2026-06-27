import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, currentLesson } = await req.json();

    // Memastikan API Key Groq Anda terdeteksi di lingkungan server
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API Key tidak ditemukan di serverless environment (.env.local)." }, 
        { status: 500 }
      );
    }

    const systemPrompt = {
      role: "system",
      content: `You are the ultimate Senior Software Architect and Mentor inside the WhiteRoom Lab Ecosystem. 
      Your tone is minimalist, direct, high-signal, and sharp—matching the technical aesthetic of Vercel and Linear's engineering documentation.
      Current context is the lesson: "${currentLesson || 'React Intro & Components Concept'}".
      Provide highly efficient answers, write elegant snippets using JetBrains Mono layout aesthetics, and clear up misinformation immediately without corporate fluff.`
    };

    // Melakukan fetch langsung ke REST API Resmi Groq Cloud
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // Menggunakan model Llama 3 70B bertenaga LPU Groq untuk inferensi instan
        messages: [systemPrompt, ...messages],
        temperature: 0.2,
        max_tokens: 1024
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    // Mengembalikan respon teks hasil generate LPU Groq ke sisi klien (Frontend)
    return NextResponse.json({ reply: data.choices[0].message.content });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}