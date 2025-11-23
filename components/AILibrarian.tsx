import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Sparkles } from 'lucide-react';
import { useAppContext } from '../App';
import { getAIRecommendation } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const AILibrarian: React.FC = () => {
  const { books } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello! I'm your AI Assistant. I can analyze our entire catalog to find the perfect book for you. What are you interested in today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await getAIRecommendation(input, books);
      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: responseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Sorry, I'm having trouble thinking right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      {/* Header */}
      <div className="p-5 border-b border-slate-50 bg-white/80 backdrop-blur-sm flex items-center justify-between z-10">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
                <h2 className="font-bold text-slate-800 text-lg">AI Librarian</h2>
                <p className="text-xs font-medium text-slate-400 flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                   Online • Powered by Gemini 2.5
                </p>
            </div>
         </div>
         <div className="hidden sm:flex items-center text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3 h-3 mr-1.5" /> Context Aware
         </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            <div className={`flex max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
               
               {/* Avatar */}
               <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm mb-1 ${msg.role === 'user' ? 'bg-slate-900' : 'bg-white border border-indigo-100'}`}>
                  {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-indigo-600" />}
               </div>
               
               {/* Bubble */}
               <div 
                  className={`px-5 py-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-br-none shadow-slate-900/10' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-slate-200/50'
                  }`}
               >
                  <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-indigo-600">$1</strong>') }} />
               </div>
            </div>
          </div>
        ))}
        
        {loading && (
           <div className="flex justify-start animate-fade-in">
              <div className="flex items-center space-x-2 bg-white px-5 py-4 rounded-3xl rounded-bl-none border border-slate-100 shadow-sm ml-11">
                 <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                 <span className="text-xs font-medium text-slate-500">Thinking...</span>
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-5 bg-white border-t border-slate-100">
         <form onSubmit={handleSend} className="relative flex items-center gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for recommendations, summaries, or insights..."
              className="flex-1 pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all text-sm font-medium shadow-inner"
            />
            <button 
               type="submit" 
               disabled={loading || !input.trim()}
               className="absolute right-2 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-lg shadow-indigo-600/20"
            >
               <Send className="w-4 h-4" />
            </button>
         </form>
         <p className="text-center text-[10px] text-slate-400 mt-3">
            AI can make mistakes. Please check important information.
         </p>
      </div>
    </div>
  );
};