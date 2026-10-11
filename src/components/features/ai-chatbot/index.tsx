/**
 * @file components/features/ai-chatbot/index.tsx
 * @description AI Chatbot main component with state management
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CHATBOT_CONFIG, getChatbotMessages } from '@/lib/config/ai-context';
import { RobotLauncher } from './robot';
import { ChatWindow } from './chat-window';
import { ASK_EVENT } from './ask';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIChatbot() {
  const locale = useLocale() as 'en' | 'fr' | 'ar';
  const messages = getChatbotMessages(locale);
  const tBot = useTranslations('AskBot');
  
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Add welcome message when first opened
  useEffect(() => {
    if (isOpen && chatMessages.length === 0) {
      setChatMessages([
        {
          role: 'assistant',
          content: messages.welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, chatMessages.length, messages.welcomeMessage]);

  const handleSendMessage = () => sendMessage(input);

  // Let other parts of the page open the chat with a question (see askChatbot)
  const sendRef = useRef(sendMessage);
  sendRef.current = sendMessage;
  useEffect(() => {
    const onAsk = (e: Event) => {
      const prompt = (e as CustomEvent<{ prompt?: string }>).detail?.prompt ?? '';
      setIsOpen(true);
      if (prompt.trim()) sendRef.current(prompt);
    };
    window.addEventListener(ASK_EVENT, onAsk);
    return () => window.removeEventListener(ASK_EVENT, onAsk);
  }, []);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    // Client-side validation
    if (text.trim().length > 2000) {
      const errorMessage: Message = {
        role: 'assistant',
        content: messages.tooLongMessage,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          language: locale, // Pass the current language to the API
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = data.retryAfter || 60;
          throw new Error(messages.retryMessage(retryAfter));
        }

        throw new Error(data.details || data.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage: Message = {
        role: 'assistant',
        content:
          error instanceof Error
            ? error.message
            : messages.errorMessage,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <RobotLauncher onClick={() => setIsOpen(true)} hidden={isOpen} label={tBot('label')} hello={tBot('hello')} />
      <ChatWindow
        isOpen={isOpen}
        name={CHATBOT_CONFIG.name}
        messages={chatMessages}
        isLoading={isLoading}
        input={input}
        inputRef={inputRef}
        onClose={() => setIsOpen(false)}
        onInputChange={setInput}
        onSend={handleSendMessage}
        onKeyDown={handleKeyDown}
        placeholder={messages.placeholderText}
      />
    </>
  );
}
