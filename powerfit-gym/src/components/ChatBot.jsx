import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const STARTERS = {
  english: ['What are your timings?', 'How much is membership?', 'Do you have a free trial?'],
  marathi: ['वेळापत्रक काय आहे?', 'मेंबरशिप किती आहे?', 'फ्री ट्रायल मिळेल का?'],
};

const WELCOME = {
  english: "Hi! I'm the PowerFit AI assistant. Ask me anything about timings, membership, classes, or trainers!",
  marathi: 'नमस्कार! PowerFit Gym मध्ये स्वागत आहे 💪 काय विचारायचे आहे?',
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1F2937] rounded-2xl rounded-bl-sm w-fit">
      <span className="typing-dot w-2 h-2 rounded-full bg-[#9CA3AF]" />
      <span className="typing-dot w-2 h-2 rounded-full bg-[#9CA3AF]" />
      <span className="typing-dot w-2 h-2 rounded-full bg-[#9CA3AF]" />
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [startersShown, setStartersShown] = useState(true);
  const [language, setLanguage] = useState('english');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const toggleLanguage = () => {
    const next = language === 'english' ? 'marathi' : 'english';
    setLanguage(next);
    setMessages([]);
    setStartersShown(true);
    setInputText('');
  };

  const handleSend = async (textOverride = null) => {
    const text = textOverride || inputText;
    if (!text.trim() || isLoading) return;

    setMessages((prev) => [...prev, {
      id: Date.now(),
      role: 'user',
      content: text.trim(),
      suggestions: [],
    }]);
    setInputText('');
    setIsLoading(true);
    setStartersShown(false);

    try {
      const res = await fetch('/.netlify/functions/chat-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages,
          language,
        }),
      });

      if (!res.ok) throw new Error('Network response not ok');
      const data = await res.json();

      const raw = data.reply;
      const parts = raw.split('FOLLOWUP:');
      const answer = parts[0].trim();
      const suggestions = parts[1]
        ? parts[1].trim().split('|').map(s => s.trim()).filter(s => s.length > 0)
        : [];

      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: answer,
        suggestions,
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Sorry, I'm having a connection issue right now. Please WhatsApp us directly at +91 88881 34315 — we'll reply instantly!",
        suggestions: [],
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[380px] h-[500px] bg-[#111827] border border-[#1F2937] rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0B0F19] border-b border-[#1F2937]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#22C55E] rounded-full flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">PowerFit AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-[#22C55E] text-xs">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="text-xs border border-[#1F2937] rounded-full px-2 py-1 text-gray-400 hover:border-[#22C55E] hover:text-[#22C55E] transition-all duration-200"
                title={language === 'english' ? 'Switch to Marathi' : 'Switch to English'}
              >
                {language === 'english' ? 'मराठी' : 'English'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#9CA3AF] hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex gap-2">
                <div className="w-7 h-7 bg-[#22C55E] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle size={14} className="text-white" />
                </div>
                <div className="bg-[#1F2937] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                  <p className="text-[#F9FAFB] text-sm leading-relaxed">
                    {WELCOME[language]}
                  </p>
                </div>
              </div>
            )}

            {/* Starter prompts */}
            {startersShown && messages.length === 0 && (
              <div className="flex flex-col gap-2 pl-9">
                {STARTERS[language].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-sm text-[#22C55E] border border-[#22C55E]/30 hover:border-[#22C55E] hover:bg-[#22C55E]/10 rounded-full px-4 py-2 transition-all duration-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Message thread */}
            {messages.map((msg) => (
              <div key={msg.id}>
                <div className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 bg-[#22C55E] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <MessageCircle size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#22C55E] text-white rounded-tr-sm'
                        : 'bg-[#1F2937] text-[#F9FAFB] rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
                {msg.role === 'assistant' && msg.suggestions?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 mb-1 pl-9">
                    {msg.suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(s)}
                        className="text-xs bg-[#1a1f2e] border border-[#1F2937] text-gray-400 px-3 py-2 rounded-full hover:border-[#22C55E] hover:text-[#22C55E] transition-all duration-200 cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 bg-[#22C55E] rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle size={14} className="text-white" />
                </div>
                <TypingIndicator />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-[#1F2937] bg-[#0B0F19]">
            <div className="flex items-center gap-2 bg-[#1F2937] rounded-full px-4 py-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={language === 'english' ? 'Ask about timings, plans...' : 'प्रश्न विचारा...'}
                className="flex-1 bg-transparent text-white text-sm placeholder-[#6B7280] outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim() || isLoading}
                className="w-7 h-7 bg-[#22C55E] disabled:bg-[#22C55E]/30 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#16A34A] disabled:cursor-not-allowed"
                aria-label="Send"
              >
                <Send size={13} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#22C55E] hover:bg-[#16A34A] rounded-full flex items-center justify-center shadow-xl shadow-green-900/40 transition-all duration-300 hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <>
            <MessageCircle size={22} className="text-white" />
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#FBBF24] rounded-full border-2 border-[#0B0F19] animate-pulse" />
          </>
        )}
      </button>
    </>
  );
}
