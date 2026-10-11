/**
 * @file components/features/ai-chatbot/chat-messages.tsx
 * @description Chat messages container with scrolling
 */

'use client';

import { useEffect, useRef } from 'react';
import { Loader2, Bot } from 'lucide-react';
import { ChatMessage } from './chat-message';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#252526]">
      <div className="py-2 md:py-4">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full px-4 py-8 md:py-12 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-linear-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center mb-3">
              <Bot className="h-5 w-5 md:h-6 md:w-6 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Start a conversation
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs md:max-w-65 px-2">
              Ask me anything about Zied's skills, projects, or experience
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}

        {isLoading && (
          <div className="flex gap-3 px-3 py-3 md:px-4 animate-in fade-in duration-200">
            <div className="shrink-0 w-7 h-7 rounded-md bg-linear-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
