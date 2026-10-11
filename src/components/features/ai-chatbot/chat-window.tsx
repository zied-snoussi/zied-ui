/**
 * @file components/features/ai-chatbot/chat-window.tsx
 * @description Main chat window component
 */

'use client';

import { cn } from '@/lib/utils';
import { ChatHeader } from './chat-header';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  isOpen: boolean;
  name: string;
  messages: Message[];
  isLoading: boolean;
  input: string;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  onClose: () => void;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
}

export function ChatWindow({
  isOpen,
  name,
  messages,
  isLoading,
  input,
  inputRef,
  onClose,
  onInputChange,
  onSend,
  onKeyDown,
  placeholder,
}: ChatWindowProps) {
  return (
    <div
      className={cn(
        'fixed z-50 transition-all duration-200 ease-out',
        // Mobile: fullscreen
        'bottom-0 left-0 right-0 top-0',
        // Small tablets: centered with margins
        'sm:bottom-4 sm:left-4 sm:right-4 sm:top-4 sm:max-w-md sm:max-h-[90vh] sm:mx-auto',
        // Desktop: positioned bottom-right
        'md:bottom-5 md:right-5 md:left-auto md:top-auto md:mx-0 md:w-96 md:h-[32rem]',
        isOpen
          ? 'scale-100 opacity-100'
          : 'scale-95 opacity-0 pointer-events-none'
      )}
    >
      <div className="w-full h-full bg-white dark:bg-[#1f1f1f] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
        <ChatHeader name={name} onClose={onClose} />
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput
          ref={inputRef}
          value={input}
          onChange={onInputChange}
          onSend={onSend}
          onKeyDown={onKeyDown}
          isLoading={isLoading}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
