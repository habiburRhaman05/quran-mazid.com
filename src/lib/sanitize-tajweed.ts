// Allow only <span style="color:var(--xxx)">…</span> tags from the API.
// Everything else is stripped to text. Safe to render via dangerouslySetInnerHTML.
const ALLOWED_VAR = /^var\(--[a-zA-Z0-9_-]+\)$/;

export function sanitizeTajweed(html: string, enable: boolean): string {
  if (!enable) return stripTags(html);
  // Replace <span style="color:var(--xyz);"> with sanitized version, drop everything else.
  return html.replace(/<(\/?)([a-zA-Z]+)([^>]*)>/g, (_m, slash, tag, attrs: string) => {
    if (tag.toLowerCase() !== "span") return "";
    if (slash) return "</span>";
    const styleMatch = attrs.match(/style\s*=\s*"([^"]*)"/i);
    if (!styleMatch) return "<span>";
    const style = styleMatch[1];
    const colorMatch = style.match(/color\s*:\s*([^;]+)/i);
    if (!colorMatch) return "<span>";
    const value = colorMatch[1].trim();
    if (!ALLOWED_VAR.test(value)) return "<span>";
    return `<span style="color:${value}">`;
  });
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}
