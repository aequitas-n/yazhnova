import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/content/site";
export const runtime = "nodejs";

// Best-effort per-instance protection. Resend account limits remain the delivery backstop.
const requests = new Map<string, { count: number; expires: number }>();
const MAX_BYTES = 24_000;
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin && origin !== new URL(site.url).origin)
    return NextResponse.json({ error: site.contact.originError }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ error: site.contact.malformed }, { status: 415 });
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: site.contact.malformed }, { status: 400 });
  let bytes = 0;
  const decoder = new TextDecoder();
  let raw = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        return NextResponse.json({ error: site.contact.tooLarge }, { status: 413 });
      }
      raw += decoder.decode(chunk.value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return NextResponse.json({ error: site.contact.malformed }, { status: 400 });
  }
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: site.contact.malformed }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: site.contact.invalid }, { status: 422 });
  if (parsed.data.website) return NextResponse.json({ success: true });
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.CONTACT_TO;
  if (!key || !from || !to)
    return NextResponse.json({ error: site.contact.unavailable }, { status: 503 });
  const now = Date.now();
  for (const [ip, bucket] of requests) if (bucket.expires <= now) requests.delete(ip);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const bucket = requests.get(ip) || { count: 0, expires: now + 10 * 60_000 };
  if (bucket.count >= 3)
    return NextResponse.json(
      { error: site.contact.rateLimit },
      { status: 429, headers: { "Retry-After": String(Math.ceil((bucket.expires - now) / 1000)) } },
    );
  // Bound memory on long-lived local servers; this is not a distributed rate limiter.
  if (requests.size > 10_000) requests.delete(requests.keys().next().value!);
  bucket.count++;
  requests.set(ip, bucket);
  const { name, email, company, budget, service, message } = parsed.data;
  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Project enquiry: ${service}`,
      text: [
        `${site.name} — new project enquiry`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Budget: ${budget}`,
        `Service: ${service}`,
        "",
        message,
      ].join("\n"),
    });
    if (error) return NextResponse.json({ error: site.contact.errorMessage }, { status: 502 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: site.contact.errorMessage }, { status: 502 });
  }
}
