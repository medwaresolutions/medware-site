"use client";

import { Button, Card } from "@/components/ds";
import { mwWrap } from "./shared";

export const ZONE_CLOCK_URL = "https://zoneclock.app";

/* Zone Clock: a free tool we built for working across time zones.
   Sits just above "Get in touch" and opens the live app in a modal. */
export default function ZoneClock({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="zoneclock" style={{ ...mwWrap, padding: "0 24px 24px", maxWidth: 720 }}>
      <Card
        variant="filled"
        interactive
        onClick={onOpen}
        style={{
          padding: 0,
          overflow: "hidden",
          background: "var(--md-sys-color-surface-container-low)",
        }}
      >
        <div style={{ position: "relative", aspectRatio: "16 / 6", background: "#0b0b0b" }}>
          <img
            src="/zoneclock.jpg"
            alt="Zone Clock world map showing local times in cities around the globe"
            loading="lazy"
            decoding="async"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <span
            className="md-typescale-label-medium"
            style={{
              position: "absolute",
              top: 12,
              left: 14,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.14)",
              backdropFilter: "blur(6px)",
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Free tool
          </span>
        </div>
        <div style={{ padding: "20px 24px 22px" }}>
          <h3 className="md-typescale-headline-small" style={{ margin: "0 0 6px", color: "var(--md-sys-color-on-surface)" }}>
            Zone Clock
          </h3>
          <p
            className="md-typescale-body-medium"
            style={{ margin: "0 0 16px", color: "var(--md-sys-color-on-surface-variant)" }}
          >
            We work with teams across the globe, so we built a simple way to compare time zones and find the best
            meeting time for everyone. It’s free. Use it as much as you like.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Button
              variant="filled"
              icon="open_in_full"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
            >
              Open Zone Clock
            </Button>
            <Button
              variant="text"
              href={ZONE_CLOCK_URL}
              target="_blank"
              rel="noopener noreferrer"
              icon="open_in_new"
              onClick={(e) => e.stopPropagation()}
            >
              zoneclock.app
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
