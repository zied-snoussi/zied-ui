/**
 * @file components/features/ai-chatbot/chat-input.tsx
 * @description Chat input area component
 */

'use client';

import { forwardRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput = forwardRef<HTMLTextAreaElement | null, ChatInputProps>(
  ({ value, onChange, onSend, onKeyDown, isLoading, placeholder }, ref) => {
    return (
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1f1f1f] px-3 py-3 md:px-4">
        <div className="flex items-end gap-2">
          {/* Input Field */}
          <div className="flex-1 relative">
            <textarea
              ref={ref}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={placeholder || 'Ask me anything...'}
              disabled={isLoading}
              rows={1}
              maxLength={2000}
              className={cn(
                'w-full resize-none rounded-lg px-3 py-2.5',
                'text-sm leading-5',
                'bg-gray-100 dark:bg-[#2d2d2d]',
                'text-gray-900 dark:text-gray-100',
                'placeholder:text-gray-500 dark:placeholder:text-gray-400',
                'border border-gray-200 dark:border-gray-700',
                'focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors duration-150',
                'min-h-[2.5rem] max-h-32'
              )}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={onSend}
            disabled={!value.trim() || isLoading}
            className={cn(
              'shrink-0 w-10 h-10 rounded-lg',
              'flex items-center justify-center',
              'transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-1',
              // Larger touch target on mobile
              'touch-manipulation',
              value.trim() && !isLoading
                ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-sm'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            )}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
            ) : (
              <Send className="h-4 w-4" strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Helper Text - Hide on very small screens */}
        <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400 hidden sm:block">
          Press{' '}
          <kbd className="px-1.5 py-0.5 mx-0.5 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-[10px] font-mono">
            Enter
          </kbd>{' '}
          to send •{' '}
          <kbd className="px-1.5 py-0.5 mx-0.5 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-[10px] font-mono">
            Shift + Enter
          </kbd>{' '}
          for new line
        </p>
      </div>
    );
  }
);

ChatInput.displayName = 'ChatInput';
