/**
 * Cloudflare Pages Function: Youform -> WhatConverts bridge.
 *
 * Youform POSTs a form submission here (configured as the form's webhook).
 * We map the fields and create a lead in WhatConverts (profile from env) via
 * its REST API (Basic auth: token:secret). Hidden fields forwarded from the
 * landing page (gclid / utm_*) preserve PPC attribution.
 *
 * Route: POST https://remodel.hhsrenovations.com/api/youform-webhook
 *
 * Env (set as Pages project variables):
 *   WC_API_TOKEN          WhatConverts API token  (secret)
 *   WC_API_SECRET         WhatConverts API secret (secret)
 *   WC_PROFILE_ID         WhatConverts profile id (e.g. 167229)
 *   WC_SEND_NOTIFICATION  "true" | "false"  (default false; Youform already emails)
 */

interface Env {
  WC_API_TOKEN: string;
  WC_API_SECRET: string;
  WC_PROFILE_ID: string;
  WC_SEND_NOTIFICATION?: string;
}

const WC_ENDPOINT = "https://app.whatconverts.com/api/v1/leads";
const HIDDEN_KEYS = [
  "gclid", "wbraid", "gbraid", "fbclid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Pair = { key: string; value: string };

/** Recursively collect leaf key/value pairs from an arbitrary payload shape. */
function collect(obj: unknown, out: Pair[]): void {
  if (obj == null) return;
  if (Array.isArray(obj)) {
    obj.forEach((v) => collect(v, out));
    return;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (v != null && typeof v === "object") collect(v, out);
      else if (v != null && String(v).trim() !== "") out.push({ key: String(k), value: String(v) });
    }
    return;
  }
}

async function parseBody(request: Request): Promise<unknown> {
  const ct = request.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return await request.json().catch(() => ({}));
  }
  if (ct.includes("form-urlencoded") || ct.includes("multipart/form-data")) {
    const fd = await request.formData();
    return Object.fromEntries([...fd.entries()]);
  }
  const text = await request.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const payload = await parseBody(request);
  const pairs: Pair[] = [];
  collect(payload, pairs);

  const lc = (s: string) => s.toLowerCase();
  const exact = (k: string) => pairs.find((p) => lc(p.key) === k)?.value;
  const byKey = (...subs: string[]) =>
    pairs.find((p) => subs.some((s) => lc(p.key).includes(s)))?.value;

  const email =
    byKey("email") || pairs.find((p) => EMAIL_RE.test(p.value.trim()))?.value;
  const phone = byKey("phone", "mobile", "telephone");
  const name = byKey("name") || byKey("full name");
  const message = byKey("message", "tell us", "vision", "comment", "note", "detail", "project");

  const gclid = exact("gclid") || exact("wbraid") || exact("gbraid");
  const source = exact("utm_source") || (gclid ? "google" : undefined);
  const medium = exact("utm_medium") || (gclid ? "cpc" : undefined);

  const params = new URLSearchParams();
  params.set("profile_id", env.WC_PROFILE_ID);
  params.set("lead_type", "web_form");
  params.set("send_notification", env.WC_SEND_NOTIFICATION === "true" ? "true" : "false");
  if (email) params.set("email_address", email);
  if (phone) params.set("phone_number", phone);
  if (gclid) params.set("gclid", gclid);
  if (source) params.set("lead_source", source);
  if (medium) params.set("lead_medium", medium);
  const campaign = exact("utm_campaign");
  const content = exact("utm_content");
  const term = exact("utm_term");
  if (campaign) params.set("lead_campaign", campaign);
  if (content) params.set("lead_content", content);
  if (term) params.set("lead_keyword", term);
  if (name) params.set("contact_name", name);
  if (message) params.set("additional_fields[Message]", message);
  // Carry every remaining non-hidden field through as an additional field.
  for (const { key, value } of pairs) {
    if (HIDDEN_KEYS.includes(lc(key))) continue;
    if (/email|phone|mobile|telephone|name/.test(lc(key))) continue;
    params.set(`additional_fields[${key}]`, value);
  }

  const auth = btoa(`${env.WC_API_TOKEN}:${env.WC_API_SECRET}`);
  let wcStatus = 0;
  let wcBody = "";
  try {
    const res = await fetch(WC_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    wcStatus = res.status;
    wcBody = (await res.text()).slice(0, 500);
  } catch (err) {
    wcBody = `fetch error: ${err}`;
  }

  console.log("youform-webhook payload:", JSON.stringify(payload));
  console.log("wc result:", wcStatus, wcBody);

  // Always 200 so Youform marks the webhook delivered; details in body for debugging.
  return new Response(
    JSON.stringify({ ok: wcStatus >= 200 && wcStatus < 300, wc_status: wcStatus, wc_body: wcBody }),
    { status: 200, headers: { "content-type": "application/json" } },
  );
};

export const onRequestGet: PagesFunction<Env> = async () =>
  new Response(JSON.stringify({ ok: true, service: "youform-webhook" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
