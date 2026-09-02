"use client";

/** Supabase Storage turns a public URL into an attachment with ?download=<name>. */
function downloadUrl(src: string, filename?: string) {
  const name = filename?.trim();
  if (!name) return src;
  return `${src}${src.includes("?") ? "&" : "?"}download=${encodeURIComponent(name)}`;
}

export default function PdfDownload({
  src,
  label = "Download the full article",
  filename,
  size,
}: {
  src: string;
  label?: string;
  filename?: string;
  size?: string;
}) {
  const detail = [filename, "PDF", size].filter(Boolean).join(" · ");

  return (
    <div className="mw-pdf">
      <span className="mw-pdf__icon" aria-hidden="true">
        <span className="material-symbols-rounded">picture_as_pdf</span>
      </span>

      <div className="mw-pdf__meta">
        <div className="mw-pdf__label">{label}</div>
        <div className="mw-pdf__detail">{detail}</div>
      </div>

      <div className="mw-pdf__actions">
        <a className="mw-pdf__cta" href={downloadUrl(src, filename)} download={filename}>
          <span className="material-symbols-rounded" aria-hidden="true">download</span>
          Download
        </a>
        <a className="mw-pdf__view" href={src} target="_blank" rel="noopener noreferrer">
          Open
        </a>
      </div>
    </div>
  );
}
