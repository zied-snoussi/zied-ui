/**
 * @file components/features/ai-chatbot/ask.ts
 * @description Opens the AI chatbot from anywhere on the page, optionally sending a question.
 */

export const ASK_EVENT = 'ai-chatbot:ask';

export function askChatbot(prompt = '') {
  window.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: { prompt } }));
}
