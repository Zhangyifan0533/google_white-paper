import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MessageCircle, X, Send, Sparkles, Loader2, Globe } from 'lucide-react';
import { getPlainTextContent } from '../data/bookContent';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
  groundingMetadata?: any;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '你好！我是您的智能体白皮书助手。关于文档内容或相关 AI 术语，请随时问我。我也可以为您搜索最新的网络信息。' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // API Key handling - assuming process.env.API_KEY is available as per guidelines
  // In a real Vite app, this might be import.meta.env.VITE_API_KEY, but adhering to prompt rules:
  const apiKey = process.env.API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading || !apiKey) return;

    const userMessage = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const bookContext = getPlainTextContent();
      
      const systemInstruction = `
        You are an expert AI assistant for the "Generative AI Agents" whitepaper.
        
        YOUR KNOWLEDGE BASE:
        ${bookContext}
        
        INSTRUCTIONS:
        1. Answer the user's question primarily based on the provided KNOWLEDGE BASE.
        2. If the user asks about specific terms in the document (like ReAct, CoT, RAG), explain them clearly using the document's definitions.
        3. If the answer is not in the document, or if the user asks for real-time/external info, use the 'googleSearch' tool to find the answer.
        4. ALWAYS ANSWER IN CHINESE (Simplified Chinese).
        5. Be professional, concise, and helpful. Format your answer with Markdown (bolding key terms, lists, etc.).
      `;

      // Using gemini-2.5-flash-latest as a standard efficient model that supports tools
      // Per instructions: "If the user provides a common name... gemini flash: 'gemini-flash-latest'"
      // However, for grounding, instructions say: "Config rules when using googleSearch... Only tools: googleSearch is permitted."
      // And example uses "gemini-3-flash-preview". Let's use 2.5 flash which is stable for tools or 3 flash.
      // Instructions say: "Basic Text Tasks ... gemini-3-flash-preview".
      // Let's use gemini-2.5-flash for reliability with tools currently or 3-flash if preferred.
      // We will use 'gemini-2.5-flash-latest' to ensure tool support is robust.
      
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview', 
        config: {
          systemInstruction: systemInstruction,
          tools: [{ googleSearch: {} }], 
        }
      });

      // Construct history for the chat API
      // Note: We only send the last few messages to keep context clean, or reliance on chat session history
      // The SDK manages history in the `chat` object, but we need to feed previous messages if we were recreating it.
      // Since we create a new 'chat' instance each request (stateless component), we need to load history.
      // Ideally, keep 'chat' instance in a ref, but to keep it simple and robust against re-renders:
      
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      // We can't easily populate history into a new chat object in the SDK cleanly without a helper, 
      // but generateContent is easier for single-turn with context or we just use the system prompt + current msg for this lightweight implementation.
      // For better chat, let's just send the current message with the system prompt as context. 
      // Multi-turn effectively requires maintaining the chat object.
      // Let's try to maintain one chat instance if possible, but React state makes it tricky.
      // Alternative: Use generateContent with full history.
      
      const contents = [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ];

      // Since we can't pass 'history' to chat.create easily in this SDK version structure shown in docs (it implies stateful object),
      // we will use ai.models.generateContentStream which is stateless and easier to manage with manual history.
      
      const streamResult = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          tools: [{ googleSearch: {} }],
        }
      });

      let fullResponseText = "";
      let groundingMeta = null;

      // Add a placeholder for the model response
      setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);

      for await (const chunk of streamResult) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullResponseText += chunkText;
          setMessages(prev => {
            const newMsgs = [...prev];
            const lastMsg = newMsgs[newMsgs.length - 1];
            if (lastMsg.role === 'model') {
              lastMsg.text = fullResponseText;
            }
            return newMsgs;
          });
        }
        
        // Check for grounding metadata
        if (chunk.candidates?.[0]?.groundingMetadata) {
            groundingMeta = chunk.candidates[0].groundingMetadata;
        }
      }

      setMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        lastMsg.isStreaming = false;
        lastMsg.groundingMetadata = groundingMeta;
        return newMsgs;
      });

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: '抱歉，我现在无法回答。请检查网络连接或稍后再试。(需要配置有效的 API Key)' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!apiKey) {
      // Don't render if no key (or render a warning for dev)
      // For this demo, we assume key is present.
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all z-50 ${isOpen ? 'hidden' : 'flex'} items-center gap-2`}
        aria-label="Open AI Assistant"
      >
        <Sparkles size={24} />
        <span className="font-medium pr-1">AI 助手</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-400" />
              <h3 className="font-serif font-bold">文档 AI 助手</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`
                    max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'}
                  `}
                >
                  {msg.role === 'model' ? (
                     <div className="prose prose-sm prose-slate max-w-none dark:prose-invert">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                        {/* Grounding Sources Display */}
                        {msg.groundingMetadata?.groundingChunks && (
                            <div className="mt-3 pt-2 border-t border-slate-100 text-xs">
                                <div className="flex items-center gap-1 text-slate-500 mb-1 font-semibold">
                                    <Globe size={10} /> 来源:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                {msg.groundingMetadata.groundingChunks.map((chunk: any, i: number) => {
                                    if (chunk.web?.uri) {
                                        return (
                                            <a 
                                                key={i} 
                                                href={chunk.web.uri} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="bg-slate-100 hover:bg-indigo-50 text-indigo-600 px-2 py-1 rounded truncate max-w-full inline-block border border-slate-200"
                                            >
                                                {chunk.web.title || "Web Source"}
                                            </a>
                                        );
                                    }
                                    return null;
                                })}
                                </div>
                            </div>
                        )}
                     </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && !messages[messages.length - 1].isStreaming && (
              <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm flex items-center gap-2 text-slate-500 text-sm">
                    <Loader2 size={16} className="animate-spin text-indigo-600" />
                    <span>思考中...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="询问关于 RAG, ReAct 或其他问题..."
                className="w-full bg-slate-100 text-slate-800 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all border border-transparent focus:bg-white"
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-[10px] text-center text-slate-400 mt-2">
              AI 可能会产生不准确的信息。Web Search 已启用。
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;