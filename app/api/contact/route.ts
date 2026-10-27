import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/content/site";
export const runtime = "nodejs";
const attempts = new Map<string, { count: number; until: number }>();
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin && origin !== new URL(site.url).origin)
    return NextResponse.json({ error: site.contact.origin }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ error: site.contact.malformed }, { status: 415 });
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: site.contact.malformed }, { status: 400 });
  let raw = "",
    bytes = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 24000) {
        await reader.cancel();
        return NextResponse.json({ error: site.contact.tooLarge }, { status: 413 });
      }
      raw += decoder.decode(chunk.value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return NextResponse.json({ error: site.contact.malformed }, { status: 400 });
  }
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: site.contact.malformed }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(value);
  if (!parsed.success) return NextResponse.json({ error: site.contact.invalid }, { status: 422 });
  if (parsed.data.website) return NextResponse.json({ success: true });
  const { RESEND_API_KEY: key, RESEND_FROM: from, CONTACT_TO: to } = process.env;
  if (!key || !from || !to)
    return NextResponse.json({ error: site.contact.unconfigured }, { status: 503 });
  const now = Date.now();
  for (const [ip, bucket] of attempts) if (bucket.until <= now) attempts.delete(ip);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const bucket = attempts.get(ip) || { count: 0, until: now + 600000 };
  if (bucket.count >= 3)
    return NextResponse.json(
      { error: site.contact.rateLimit },
      { status: 429, headers: { "Retry-After": String(Math.ceil((bucket.until - now) / 1000)) } },
    );
  if (attempts.size > 10000) attempts.delete(attempts.keys().next().value!);
  bucket.count++;
  attempts.set(ip, bucket);
  const { name, email, company, budget, service, message } = parsed.data;
  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `${site.name} / ${service}`,
      text: [
        site.contact.formTitle,
        "",
        `${site.contact.fields.name}: ${name}`,
        `${site.contact.fields.email}: ${email}`,
        `${site.contact.fields.company}: ${company || "—"}`,
        `${site.contact.fields.budget}: ${budget}`,
        `${site.contact.fields.service}: ${service}`,
        "",
        message,
      ].join("\n"),
    });
    if (error) return NextResponse.json({ error: site.contact.error }, { status: 502 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: site.contact.error }, { status: 502 });
  }
}
