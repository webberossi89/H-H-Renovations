import { useEffect } from "react";

declare global {
  interface Window {
    YouformEmbed?: { init: () => void };
  }
}

const YOUFORM_SCRIPT = "https://app.youform.com/embed.js";

interface YouformEmbedProps {
  formId: string;
  height?: number;
}

/**
 * Renders a Youform form via the official embed.js. The script exposes
 * window.YouformEmbed.init(), which scans for [data-youform-embed] nodes and
 * swaps in an iframe. We trigger init() from an effect so it runs after React
 * has mounted the target div (the script's own auto-init fires before mount in
 * a SPA). React never renders children into the div, so embed.js owning that
 * subtree does not conflict with React.
 */
export function YouformEmbed({ formId, height = 700 }: YouformEmbedProps) {
  useEffect(() => {
    if (window.YouformEmbed) {
      window.YouformEmbed.init();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${YOUFORM_SCRIPT}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => window.YouformEmbed?.init());
      return;
    }
    const script = document.createElement("script");
    script.src = YOUFORM_SCRIPT;
    script.async = true;
    script.addEventListener("load", () => window.YouformEmbed?.init());
    document.body.appendChild(script);
  }, [formId]);

  return (
    <div
      data-youform-embed
      data-form={formId}
      data-base-url="https://app.youform.com"
      data-width="100%"
      data-height={String(height)}
      data-autoresize
    />
  );
}
