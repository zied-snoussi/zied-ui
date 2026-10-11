/**
 * @file components/features/ai-chatbot/chat-message.tsx
 * @description Individual chat message component
 */

'use client';

import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMarkdown } from './markdown';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'group flex gap-3 px-3 py-2 md:px-4 md:py-3',
        'animate-in fade-in slide-in-from-bottom-1 duration-200'
      )}
    >
      {/* Avatar */}
      <div className={cn(
        'shrink-0 w-7 h-7 rounded-md flex items-center justify-center',
        isUser 
          ? 'bg-linear-to-br from-[#10b981] to-[#059669]'
          : 'bg-linear-to-br from-[#8B5CF6] to-[#7C3AED]'
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-white" strokeWidth={2.5} />
        ) : (
          <Bot className="h-4 w-4 text-white" strokeWidth={2.5} />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
            {isUser ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        {isUser ? (
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        ) : (
          <ChatMarkdown content={content} />
        )}
      </div>
    </div>
  );
}
