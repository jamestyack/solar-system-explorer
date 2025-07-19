import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage } from '../types';

// Icon Components
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

// Main Chat Panel Component
interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiAvailable, setIsApiAvailable] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.API_KEY) {
      setIsApiAvailable(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 'You are a helpful and fun expert on the solar system. Keep your answers concise and engaging for a general audience.',
        },
      });
      setChat(chatSession);
      setMessages([
        { role: 'model', text: 'Hello! Ask me anything about our amazing solar system.' },
      ]);
    } else {
      console.error("API_KEY environment variable not set. Chat will be disabled.");
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !chat) return;

    const userMessage: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const stream = await chat.sendMessageStream({ message: currentInput });

      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], text: modelResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => {
        const lastMessage = prev[prev.length -1];
        if (lastMessage.role === 'model' && lastMessage.text === '') {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { ...lastMessage, text: 'Sorry, I encountered an error. Please try again.' };
          return newMessages;
        }
        return [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isApiAvailable) return null;

  return (
    <div className={`fixed inset-x-0 bottom-0 top-[25vh] sm:top-auto sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[65vh] transform transition-all duration-300 ease-in-out z-40 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full sm:translate-y-10 pointer-events-none'}`}>
        <div className="flex flex-col h-full bg-black/70 backdrop-blur-md sm:rounded-lg shadow-2xl border border-gray-700">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-gray-600 flex-shrink-0">
                <h2 className="text-xl font-bold">Ask Gemini</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close chat">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </header>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${
                                msg.role === 'user' ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'
                            }`}
                        >
                            <p className="text-white whitespace-pre-wrap break-words">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-sm px-4 py-2 rounded-2xl bg-gray-700 rounded-bl-none">
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-white rounded-full animate-[pulse_1s_ease-in-out_0s_infinite]"></span>
                                <span className="w-2 h-2 bg-white rounded-full animate-[pulse_1s_ease-in-out_0.2s_infinite]"></span>
                                <span className="w-2 h-2 bg-white rounded-full animate-[pulse_1s_ease-in-out_0.4s_infinite]"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-gray-600 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about planets..."
                        disabled={isLoading}
                        className="flex-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 disabled:opacity-50"
                        aria-label="Chat input"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send message"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default ChatPanel;
