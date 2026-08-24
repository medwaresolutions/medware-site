/**
 * Minimal markdown renderer for blog posts.
 *
 * Emits semantic HTML with no utility classes — the styling lives in the
 * `.mw-prose` rules in globals.css, so the editor preview and the published
 * article render identically.
 */

type Align = "left" | "center" | "right";

const isRow = (line: string) => /^\s*\|.*\|\s*$/.test(line);

const isSeparator = (line: string) =>
  /^\s*\|[\s:|-]+\|\s*$/.test(line) && line.includes("-");

/** Splits a table row on unescaped pipes, dropping the outer pair. */
function splitCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim().replace(/\\\|/g, "|"));
}

function alignmentsFrom(separator: string): Align[] {
  return splitCells(separator).map((cell) => {
    const left = cell.startsWith(":");
    const right = cell.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    return "left";
  });
}

/**
 * GitHub-style pipe tables. Runs before the inline replacements so cell
 * content still picks up bold, italics and links.
 */
function renderTables(source: string): string {
  const lines = source.split("\n");
  const out: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const startsTable =
      isRow(lines[i]) && i + 1 < lines.length && isSeparator(lines[i + 1]);

    if (!startsTable) {
      out.push(lines[i]);
      continue;
    }

    const headers = splitCells(lines[i]);
    const aligns = alignmentsFrom(lines[i + 1]);
    i += 2;

    const rows: string[][] = [];
    while (i < lines.length && isRow(lines[i]) && !isSeparator(lines[i])) {
      rows.push(splitCells(lines[i]));
      i++;
    }
    i--;

    const align = (n: number) =>
      aligns[n] && aligns[n] !== "left" ? ` style="text-align:${aligns[n]}"` : "";

    out.push('<div class="mw-table-wrap">');
    out.push("<table>");
    out.push(
      "<thead><tr>" +
        headers.map((cell, n) => `<th${align(n)}>${cell}</th>`).join("") +
        "</tr></thead>",
    );
    if (rows.length) {
      out.push("<tbody>");
      for (const row of rows) {
        // Index off the header so short or overlong rows stay aligned.
        out.push(
          "<tr>" +
            headers.map((_, n) => `<td${align(n)}>${row[n] ?? ""}</td>`).join("") +
            "</tr>",
        );
      }
      out.push("</tbody>");
    }
    out.push("</table>");
    out.push("</div>");
  }

  return out.join("\n");
}

export function renderMarkdown(content: string): string {
  // Raw HTML passthrough blocks
  let html = content.replace(/:::html\n([\s\S]*?)\n:::/g, (_, inner) => inner);

  // Media shortcodes
  html = html.replace(/^::image\[(.+)\]$/gim, '<img src="$1" alt="" class="mw-prose-media" />');
  html = html.replace(/^::video\[(.+)\]$/gim, '<video src="$1" controls class="mw-prose-media"></video>');
  html = html.replace(/^::audio\[(.+)\]$/gim, '<audio src="$1" controls style="width:100%;margin:24px 0;"></audio>');
  html = html.replace(
    /^::iframe\[(.+)\]$/gim,
    '<div class="mw-embed"><iframe src="$1" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>',
  );

  html = renderTables(html);

  html = html
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^---$/gim, "<hr />")
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  html = html.replace(/((<li.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  const lines = html.split("\n");
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("<")) {
      result.push(`<p>${trimmed}</p>`);
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}
