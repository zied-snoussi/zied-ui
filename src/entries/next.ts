/**
 * @zied-snoussi/ui/next — Next.js App Router components.
 * Require `next`, `next-intl` (locales en/fr/ar) and `next-themes` in the host app.
 * Translations: copy or merge `@zied-snoussi/ui/messages/<locale>.json`.
 */
export { ThemeProvider } from '../components/providers/theme-provider';
export { Navbar, Footer, LanguageSwitcher, ThemeToggle } from '../components/layout';
export { SectionHeader } from '../components/shared/section-header';
export { ScrollToTop } from '../components/shared/scroll-to-top';
export { default as ProjectCard } from '../components/features/project-card';
export { AIChatbot } from '../components/features/ai-chatbot';
export { askChatbot, ASK_EVENT } from '../components/features/ai-chatbot/ask';
export { ChatWindow } from '../components/features/ai-chatbot/chat-window';
export { ChatHeader } from '../components/features/ai-chatbot/chat-header';
export { ChatInput } from '../components/features/ai-chatbot/chat-input';
export { ChatMessage } from '../components/features/ai-chatbot/chat-message';
export { ChatMessages } from '../components/features/ai-chatbot/chat-messages';
export { ChatMarkdown } from '../components/features/ai-chatbot/markdown';
export { RobotSvg, RobotLauncher } from '../components/features/ai-chatbot/robot';
export { routing } from '../i18n/routing';
