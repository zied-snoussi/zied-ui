/**
 * Mocks the portfolio's Next.js API routes so interactive components
 * (AI chatbot, contact form) work inside Storybook without a backend.
 */
const originalFetch = typeof window !== 'undefined' ? window.fetch.bind(window) : undefined;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function installApiMocks() {
  if (!originalFetch || (window as unknown as { __apiMocked?: boolean }).__apiMocked) return;
  (window as unknown as { __apiMocked?: boolean }).__apiMocked = true;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

    if (url.endsWith('/api/chat')) {
      await delay(700);
      const body = JSON.parse(String(init?.body ?? '{}')) as { messages?: { content: string }[] };
      const last = body.messages?.at(-1)?.content ?? '';
      return json({
        message: `**Storybook mock reply.** You asked: _${last}_\n\nIn production this calls \`/api/chat\` (Claude). Here the response is mocked so the component can be reviewed offline.`,
      });
    }

    if (url.endsWith('/api/contact')) {
      await delay(600);
      return json({ success: true });
    }

    return originalFetch(input, init);
  };
}
