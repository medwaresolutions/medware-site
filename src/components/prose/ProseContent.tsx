"use client";

import { useMemo } from "react";
import { parseProseBlocks } from "@/lib/markdown";
import AudioPlayer from "./AudioPlayer";
import PdfDownload from "./PdfDownload";

/**
 * Renders a post body. Ordinary markdown stays as HTML styled by `.mw-prose`;
 * audio and PDF blocks become real components so they get a player and a
 * download card. Used by both the live article and the editor preview.
 */
export default function ProseContent({ content }: { content: string }) {
  const blocks = useMemo(() => parseProseBlocks(content), [content]);

  return (
    <div className="mw-prose">
      {blocks.map((block, i) => {
        if (block.kind === "audio") {
          return <AudioPlayer key={i} src={block.src} title={block.title} subtitle={block.subtitle} />;
        }
        if (block.kind === "pdf") {
          return (
            <PdfDownload
              key={i}
              src={block.src}
              label={block.label}
              filename={block.filename}
              size={block.size}
            />
          );
        }
        return <div key={i} dangerouslySetInnerHTML={{ __html: block.html }} />;
      })}
    </div>
  );
}
