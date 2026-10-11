/**
 * @file components/features/ai-chatbot/markdown.tsx
 * @description Minimal, safe Markdown renderer for assistant replies.
 * Supports paragraphs, headings (rendered as bold lines), bullet and numbered lists,
 * **bold**, *italic*, `code` and [links](https://…). Output is built from React
 * elements only (no HTML injection); links are limited to http(s) and mailto.
 */

import React from 'react';

const INLINE = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*|_[^_\s][^_]*_)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      return (
        <strong key={key} className="font-semibold text-foreground">
          {renderInline(part.slice(2, -2), key)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={key} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (/^(https?:|mailto:)/i.test(href)) {
        return (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="text-brand-blue underline underline-offset-2 hover:text-brand-violet">
            {label}
          </a>
        );
      }
      return label;
    }
    if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'ul' | 'ol'; items: string[] };

function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length) blocks.push({ type: 'p', text: paragraph.join(' ') });
    paragraph = [];
  };

  for (const raw of source.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trim();
    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(line);

    if (!line || /^([-*_])\1{2,}$/.test(line)) {
      flush();
    } else if (heading) {
      flush();
      blocks.push({ type: 'h', text: heading[1] });
    } else if (bullet || numbered) {
      flush();
      const type = bullet ? 'ul' : 'ol';
      const text = (bullet ?? numbered)![1];
      const last = blocks[blocks.length - 1];
      if (last && last.type === type) last.items.push(text);
      else blocks.push({ type, items: [text] });
    } else {
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

export function ChatMarkdown({ content }: { content: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed text-gray-800 dark:text-gray-200 break-words">
      {parseBlocks(content).map((block, i) => {
        const key = `b${i}`;
        if (block.type === 'h') {
          return (
            <p key={key} className="pt-1 font-semibold text-foreground">
              {renderInline(block.text, key)}
            </p>
          );
        }
        if (block.type !== 'p') {
          const List = block.type;
          return (
            <List key={key} className={block.type === 'ul' ? 'list-disc space-y-1 ps-5 marker:text-brand-violet' : 'list-decimal space-y-1 ps-5 marker:text-brand-violet'}>
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
              ))}
            </List>
          );
        }
        return <p key={key}>{renderInline(block.text, key)}</p>;
      })}
    </div>
  );
}
