/**
 * Simple markdown-to-HTML renderer
 * Handles: headings, bold, inline code, code blocks, tables, lists, paragraphs
 */
export function renderMarkdown(text) {
  if (!text) return '';

  let html = text;

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const langAttr = lang ? ` data-lang="${lang}"` : '';
    return `<div class="code-block"${langAttr}>${lang ? `<span class="code-lang-badge">${lang}</span>` : ''}<pre><code>${escapeHtml(code.trim())}</code></pre></div>`;
  });
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
    return `<div class="code-block"><pre><code>${escapeHtml(code.trim())}</code></pre></div>`;
  });

  // Tables
  html = html.replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)+)/g, (_, header, rows) => {
    const headers = header.split('|').map(h => h.trim()).filter(Boolean);
    const headerHtml = headers.map(h => `<th>${h}</th>`).join('');
    const rowLines = rows.trim().split('\n');
    const rowsHtml = rowLines.map(row => {
      const cells = row.split('|').map(c => c.trim()).filter(Boolean);
      return `<tr>${cells.map(c => `<td>${renderInline(c)}</td>`).join('')}</tr>`;
    }).join('');
    return `<table><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
  });

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Unordered lists
  html = html.replace(/((?:^- .+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(l => `<li>${renderInline(l.replace(/^- /, ''))}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  // Numbered lists
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(l => `<li>${renderInline(l.replace(/^\d+\. /, ''))}</li>`).join('');
    return `<ol>${items}</ol>`;
  });

  // Paragraphs (lines not starting with < or already wrapped)
  const lines = html.split('\n');
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) { result.push(''); continue; }
    if (line.startsWith('<')) { result.push(line); continue; }
    result.push(`<p>${renderInline(line)}</p>`);
  }
  html = result.join('\n');

  return html;
}

function renderInline(text) {
  // Bold + italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  return text;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
