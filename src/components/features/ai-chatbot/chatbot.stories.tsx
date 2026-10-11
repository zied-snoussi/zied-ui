import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef, useState } from 'react';
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test';
import { AIChatbot } from './index';
import { ChatWindow } from './chat-window';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { ChatHeader } from './chat-header';
import { ChatMarkdown } from './markdown';
import { RobotSvg, RobotLauncher } from './robot';

const now = new Date();
const conversation = [
  { role: 'user' as const, content: 'What does Zied work on?', timestamp: now },
  {
    role: 'assistant' as const,
    content:
      'Zied is a **Full-Stack AI Engineer** at Bysur. He builds:\n\n- AI document verification (LLM checks)\n- RAG assistants measured with evals\n- Agent workflows over `MCP`\n\nAsk me about a project!',
    timestamp: now,
  },
];

const meta = {
  title: 'Features/AI Chatbot',
  component: AIChatbot,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Floating assistant that answers questions about the portfolio. In production it posts to `/api/chat` (Claude). In Storybook the API is mocked in `.storybook/mocks/api.ts`, so you can type a message and get a reply.',
      },
    },
  },
  decorators: [(Story) => <div style={{ height: 640, position: 'relative' }}><Story /></div>],
} satisfies Meta<typeof AIChatbot>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  parameters: { a11y: { test: 'todo' } }, // known issue (color-contrast), see docs/ACCESSIBILITY.md
  play: async ({ canvasElement }) => {
    await userEvent.click(await within(canvasElement).findByRole('button', { name: /AI assistant/i }));
    const input = await screen.findByRole('textbox');
    await userEvent.type(input, 'What is your stack?');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => expect(screen.getByText(/Storybook mock reply/i)).toBeVisible(), { timeout: 5000 });
  },
};

function WindowDemo() {
  const [input, setInput] = useState('');
  const ref = useRef<HTMLTextAreaElement | null>(null);
  return (
    <ChatWindow
      isOpen
      name="Zied's assistant"
      messages={conversation}
      isLoading={false}
      input={input}
      inputRef={ref}
      onClose={fn()}
      onInputChange={setInput}
      onSend={fn()}
      onKeyDown={() => {}}
      placeholder="Ask about my projects…"
    />
  );
}

export const Window: StoryObj<typeof ChatWindow> = {
  name: 'ChatWindow',
  render: () => <WindowDemo />,
  parameters: { a11y: { test: 'todo' } }, // known issue, see docs/ACCESSIBILITY.md
};

export const Messages: StoryObj<typeof ChatMessage> = {
  name: 'ChatMessage',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      {conversation.map((m, i) => <ChatMessage key={i} {...m} />)}
    </div>
  ),
};

export const Input: StoryObj<typeof ChatInput> = {
  name: 'ChatInput',
  parameters: { layout: 'padded', a11y: { test: 'todo' } }, // a11y: known issue, see docs/ACCESSIBILITY.md
  play: async ({ canvasElement }) => {
    const textbox = within(canvasElement).getByRole('textbox');
    await userEvent.type(textbox, 'Hello');
    await expect(textbox).toHaveValue('Hello');
  },
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <div className="max-w-md">
        <ChatInput value={value} onChange={setValue} onSend={fn()} onKeyDown={() => {}} isLoading={false} placeholder="Ask about my projects…" />
      </div>
    );
  },
};

export const Header: StoryObj<typeof ChatHeader> = {
  name: 'ChatHeader',
  parameters: { layout: 'padded' },
  render: () => <div className="max-w-md overflow-hidden rounded-xl border"><ChatHeader name="Zied's assistant" onClose={fn()} /></div>,
};

export const Markdown: StoryObj<typeof ChatMarkdown> = {
  name: 'ChatMarkdown',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="max-w-md rounded-xl border p-4 text-sm">
      <ChatMarkdown content={'### Stack\n\n- **Front:** Next.js, Angular\n- **Back:** NestJS, Spring Boot\n\n1. Design\n2. Build\n3. Evaluate\n\nInline `code` and a [link](https://zied-snoussi.vercel.app).'} />
    </div>
  ),
};

export const Robot: StoryObj<typeof RobotSvg> = {
  name: 'Robot',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex items-end gap-10">
      <RobotSvg className="h-48 w-auto" />
      <RobotLauncher onClick={fn()} hidden={false} label="Open the assistant" hello="Hi! Ask me anything." />
    </div>
  ),
};
