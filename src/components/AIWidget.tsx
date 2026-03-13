"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, X, Send, ChevronDown, Leaf } from "lucide-react";

type Message = {
    role: "user" | "model";
    text: string;
};



export default function AIWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isDogPeeking, setIsDogPeeking] = useState(false);
    const [hasPeeked, setHasPeeked] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            const interval = setInterval(() => {
                setIsDogPeeking(true);
                setHasPeeked(true);
                setTimeout(() => {
                    setIsDogPeeking(false);
                }, 4000);
            }, 15000);
            return () => clearInterval(interval);
        } else {
            setIsDogPeeking(false);
        }
    }, [isOpen]);

    useEffect(() => {
        // Check time for auto-greeting out of hours
        const checkTime = () => {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();
            const minute = now.getMinutes();

            const isWeekend = day === 0 || day === 6;
            const timeInMinutes = hour * 60 + minute;
            const isOutsideHours = timeInMinutes < 8 * 60 + 30 || timeInMinutes >= 18 * 60;

            if (isWeekend || isOutsideHours) {
                setMessages([{ role: "model", text: "We're currently closed. For emergencies please call A&E Vets Cheadle on 0161 486 2355. I can still answer general questions!" }]);
            } else {
                setMessages([{ role: "model", text: "Hi! I'm Ivy, the AI concierge for Evergreen Vets. How can I help you and your pet today?" }]);
            }
        };

        checkTime();

        // Trigger slide up of the pill bar after 2 seconds
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = { role: "user", text };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            // Build the chat history for Gemini API
            const geminiMessages = [
                ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
                { role: "user", parts: [{ text }] }
            ];

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: geminiMessages }),
            });

            if (!res.ok) throw new Error("API failed");

            const data = await res.json();
            const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (botResponse) {
                setMessages(prev => [...prev, { role: "model", text: botResponse }]);
            } else {
                setMessages(prev => [...prev, { role: "model", text: "I'm having a little trouble connecting right now. Please call us directly on 01625 859019." }]);
            }
        } catch (e) {
            console.error(e);
            setMessages(prev => [...prev, { role: "model", text: "I'm sorry, I encountered an error. Please try again or call the practice." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickReply = (text: string) => {
        if (text === "Book appointment") {
            setIsOpen(false);
            window.dispatchEvent(new CustomEvent("open-booking-modal"));
        } else if (text === "Prescriptions") {
            setIsOpen(false);
            window.dispatchEvent(new CustomEvent("open-prescription-modal"));
        } else {
            handleSend(text);
        }
    };

    if (!isMounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">

            {/* Widget Modal */}
            {isOpen && (
                <div className="w-[380px] h-[550px] max-h-[85vh] max-w-[calc(100vw-48px)] bg-warm-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-fade-up border border-sage/20 relative">

                    {/* Header */}
                    <div className="bg-forest text-white p-4 flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="bg-moss rounded-full w-10 h-10 flex items-center justify-center text-mint">
                                    <Leaf size={20} />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-forest animate-pulse-slow"></div>
                            </div>
                            <div>
                                <h3 className="font-display font-medium text-lg leading-tight">Ivy</h3>
                                <p className="text-xs text-mint/80 font-mono">Evergreen Vets Concierge</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors interactive">
                            <ChevronDown size={24} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${m.role === "user"
                                        ? "bg-cream border border-sage/20 text-charcoal rounded-tr-sm"
                                        : "bg-forest/5 border border-forest/10 text-charcoal rounded-tl-sm"
                                        }`}
                                    style={{ whiteSpace: "pre-wrap" }}
                                >
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-forest/5 border border-forest/10 text-forest rounded-2xl rounded-tl-sm p-4 w-16 h-10 flex items-center justify-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-forest/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-1.5 h-1.5 bg-forest/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-1.5 h-1.5 bg-forest/40 rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies (show if conversation is short) */}
                    {messages.length < 3 && !loading && (
                        <div className="px-4 pb-2 flex flex-wrap gap-2">
                            {["Opening hours", "Book appointment", "Emergency?", "Prescriptions"].map(qr => (
                                <button
                                    key={qr}
                                    onClick={() => handleQuickReply(qr)}
                                    className="bg-cream hover:bg-gold/20 text-forest text-xs px-3 py-1.5 rounded-full border border-sage/20 transition-colors interactive"
                                >
                                    {qr}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                        className="p-3 bg-white border-t border-sage/20 flex gap-2 items-end"
                    >
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(input); } }}
                            placeholder="Ask me anything..."
                            className="flex-1 resize-none bg-cream/50 rounded-xl max-h-32 min-h-11 px-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-moss/30 transition-shadow no-scrollbar interactive"
                            rows={input.split("\n").length > 1 ? 2 : 1}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="bg-forest text-gold p-3 rounded-xl disabled:opacity-50 hover:bg-forest/90 transition-colors shrink-0 interactive"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Trigger Pill bar */}
            {!isOpen && (
                <div className="relative animate-fade-up z-50 overflow-visible">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes dog-peek-up {
                            0% { transform: translateY(40px); opacity: 0; }
                            10% { opacity: 1; }
                            100% { transform: translateY(10px); opacity: 1; }
                        }
                        @keyframes dog-slide-down {
                            0% { transform: translateY(10px); opacity: 1; }
                            80% { opacity: 1; }
                            100% { transform: translateY(40px); opacity: 0; }
                        }
                        .animate-dog-peek {
                            animation: dog-peek-up 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
                        }
                        .animate-dog-hide {
                            animation: dog-slide-down 0.4s ease-in forwards;
                        }
                    `}} />

                    <div
                        className={`absolute bottom-full left-4 flex items-end gap-2 pointer-events-none 
                            ${isDogPeeking ? 'animate-dog-peek' : (hasPeeked ? 'animate-dog-hide' : 'opacity-0')}
                        `}
                        style={{ zIndex: -1 }}
                    >
                        <div className="bg-forest text-cream text-[10px] sm:text-xs px-3 py-2 rounded-2xl shadow-lg relative max-w-[130px] sm:max-w-[170px] leading-tight mb-2">
                            Can't find what you're looking for? Ivy's here to help! 🐾
                            <div className="absolute right-[-4px] bottom-3 w-0 h-0 border-t-[5px] border-t-transparent border-l-[6px] border-l-forest border-b-[5px] border-b-transparent"></div>
                        </div>

                        <svg width="45" height="45" viewBox="0 0 100 100" className="drop-shadow-md relative z-[-1] mb-[-5px]">
                            <g fill="#d2b48c">
                                <path d="M 25 35 Q 5 15 15 50 Q 25 70 30 55" fill="#8b4513" />
                                <path d="M 75 35 Q 95 15 85 50 Q 75 70 70 55" fill="#8b4513" />
                                <circle cx="50" cy="50" r="35" />
                                <ellipse cx="50" cy="65" rx="20" ry="15" fill="#ffefd5" />
                                <path d="M 45 60 Q 50 65 55 60" stroke="#2a2a2a" strokeWidth="3" fill="transparent" />
                                <circle cx="50" cy="57" r="6" fill="#2a2a2a" />
                                <circle cx="38" cy="45" r="4" fill="#2a2a2a" />
                                <circle cx="62" cy="45" r="4" fill="#2a2a2a" />
                            </g>
                        </svg>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative bg-forest text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(26,58,42,0.8)] transition-all cursor-pointer group pointer-events-auto interactive group z-10"
                    >
                        <div className="relative">
                            <Sparkles size={18} className="text-gold group-hover:rotate-12 transition-transform" />
                        </div>
                        <span className="font-medium text-sm">24/7 Vet Concierge — Ask anything</span>
                    </button>
                </div>
            )}

        </div>
    );
}
