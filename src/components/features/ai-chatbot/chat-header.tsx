/**
 * @file components/features/ai-chatbot/chat-header.tsx
 * @description Chat window header component
 */

'use client';

import { X, Sparkles } from 'lucide-react';

interface ChatHeaderProps {
  name: string;
  onClose: () => void;
}

export function ChatHeader({ name, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-3 py-3 md:px-4 bg-white dark:bg-[#1f1f1f] border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-md bg-linear-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 border-2 border-white dark:border-[#1f1f1f] rounded-full"></span>
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
            {name}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
            Always ready to help
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation"
        aria-label="Close chat"
      >
        <X className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}
