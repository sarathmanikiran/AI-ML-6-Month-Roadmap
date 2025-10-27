import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { SendIcon } from './icons';

const LinkifiedText: React.FC<{ text: string }> = ({ text }) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // The split will interleave text and matching URLs. We only process the URLs.
    const parts = text.split(urlRegex);

    return (
        <>
            {parts.map((part, index) => {
                // Check if the part is a URL matched by our regex.
                if (part && part.match(urlRegex)) {
                    let url = part;
                    let trailingChars = '';
                    
                    const openBrackets = '([{';
                    const closeBrackets = ')]}';

                    let changed = true;
                    while (changed) {
                        changed = false;
                        if (url.length === 0) break;
                        
                        const lastChar = url.slice(-1);

                        // Handle simple trailing punctuation
                        if ('.?!,;:\'"<>'.includes(lastChar)) {
                            trailingChars = lastChar + trailingChars;
                            url = url.slice(0, -1);
                            changed = true;
                            continue;
                        }

                        // Handle paired brackets
                        const bracketIndex = closeBrackets.indexOf(lastChar);
                        if (bracketIndex > -1) {
                            const openBracket = openBrackets[bracketIndex];
                            
                            // Count brackets to check for balance.
                            // Escaping is needed for regex.
                            const openCount = (url.match(new RegExp('\\' + openBracket, 'g')) || []).length;
                            const closeCount = (url.match(new RegExp('\\' + lastChar, 'g')) || []).length;
                            
                            // If a closing bracket is unbalanced, it's likely trailing.
                            if (closeCount > openCount) {
                                trailingChars = lastChar + trailingChars;
                                url = url.slice(0, -1);
                                changed = true;
                                continue;
                            }
                        }
                    }

                    return (
                        <React.Fragment key={index}>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-indigo-700 break-all"
                            >
                                {url}
                                <span className="sr-only">(opens in new tab)</span>
                            </a>
                            {trailingChars}
                        </React.Fragment>
                    );
                }
                return <React.Fragment key={index}>{part}</React.Fragment>;
            })}
        </>
    );
};


const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if (isOpen) {
            // Set initial message only when opening and messages are empty
            if (messages.length === 0) {
                 setMessages([{ role: 'model', text: 'Hello! I am your AI assistant. How can I help you with your ML roadmap today?' }]);
            }
            // Move focus to input after the transition ends
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
            return () => clearTimeout(timer);
        } else {
            // On close, return focus to the button that opened the dialog
            toggleButtonRef.current?.focus();
        }
    }, [isOpen]);


    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponse = await getChatbotResponse(input, messages);
            const modelMessage: ChatMessage = { role: 'model', text: botResponse };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error('Error getting response from Gemini:', error);
            const errorMessage: ChatMessage = {
                role: 'model',
                text: error instanceof Error ? error.message : 'Sorry, an unknown error occurred. Please try again.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }

    return (
        <>
            <button
                ref={toggleButtonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-110 hover:rotate-12 z-50"
                aria-label="Toggle chatbot"
                aria-expanded={isOpen}
                aria-controls="chatbot-window"
            >
                <svg className={`w-8 h-8 transition-transform duration-300 ${isOpen ? 'transform rotate-180 scale-75' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M7 8h10M7 12h4m-4 4h8"} />
                </svg>
            </button>

            <div 
                id="chatbot-window"
                role="dialog"
                aria-modal="false"
                aria-labelledby="chatbot-header"
                className={`fixed bottom-24 right-6 w-full max-w-sm bg-white rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-40 ${isOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10 pointer-events-none'}`} style={{height: 'min(600px, calc(100vh - 10rem))'}}>
                <header className="p-4 bg-indigo-600 text-white rounded-t-xl">
                    <h3 id="chatbot-header" className="text-lg font-semibold">AI Roadmap Assistant</h3>
                </header>
                <div 
                    className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4"
                    role="log"
                    aria-live="polite"
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex my-2 items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-2xl max-w-xs break-words shadow-sm ${msg.role === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                <span className="sr-only">
                                    {msg.role === 'user' ? 'Your message:' : 'AI Assistant message:'}
                                </span>
                                {msg.role === 'model' ? <LinkifiedText text={msg.text} /> : msg.text}
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start my-2">
                             <div className="p-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none" aria-label="AI is thinking">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                </div>
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
                    <div className="relative flex items-center">
                        <label htmlFor="chat-input" className="sr-only">Ask a question</label>
                        <input
                            ref={inputRef}
                            id="chat-input"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask a question..."
                            className="w-full border border-gray-300 rounded-full p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                            disabled={isLoading}
                        />
                        <button 
                            onClick={handleSend} 
                            className="absolute right-2 bg-indigo-600 text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-indigo-700 disabled:bg-indigo-300 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500" 
                            disabled={isLoading}
                            aria-label="Send message"
                        >
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbot;