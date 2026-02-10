
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PROGRAMS } from '../constants';

const SmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello! I am your AI Admission Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `User is applying for Master by Research at UNISEL. Programs: ${PROGRAMS.map(p => p.label).join(', ')}. Question: ${userMessage}`,
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Sorry, I can't help with that right now." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Service temporarily busy." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[450px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-10">
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
            <h4 className="text-sm font-bold">Admission Assistant</h4>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white"><i className="fas fa-times"></i></button>
          </div>
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white border-t flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask anything..." className="flex-grow text-sm bg-slate-50 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
            <button onClick={handleSend} className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-orange-600"><i className="fas fa-paper-plane"></i></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-16 h-16 bg-slate-900 hover:bg-orange-600 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90">
          <i className="fas fa-robot text-white text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default SmartAssistant;
