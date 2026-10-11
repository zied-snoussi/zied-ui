// Hosted Storybook MCP server (docs toolset) for @zied-snoussi/ui.
// Storybook on GitHub Pages is static, so this function serves the MCP
// endpoint and reads the manifests that the Storybook build publishes there.
import { createStorybookMcpHandler } from '@storybook/mcp';

const STORYBOOK_URL = process.env.STORYBOOK_URL ?? 'https://zied-snoussi.github.io/zied-ui/';

const handler = await createStorybookMcpHandler({
  manifestProvider: async (_request, path) => {
    const url = new URL(path, STORYBOOK_URL);
    const response = await fetch(url, { headers: { accept: 'application/json' } });
    if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
    return response.text();
  },
});

const cors = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-headers': '*',
  'access-control-expose-headers': 'mcp-session-id',
};

async function serve(request) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  const response = await handler(request);
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(cors)) headers.set(key, value);
  return new Response(response.body, { status: response.status, headers });
}

export { serve as GET, serve as POST, serve as DELETE, serve as OPTIONS };
