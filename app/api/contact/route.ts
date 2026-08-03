import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "../../../lib/site.config";
import { renderContactEmail, type ContactSubmission } from "../../../lib/contact-email";
import { EMAIL_LOGO_PNG_BASE64 } from "../../../lib/email-logo";

/**
 * Contact-form delivery via Resend.
 *
 * Environment:
 *  - RESEND_API_KEY               (required) — Resend dashboard → API Keys
 *  - CONTACT_FROM_EMAIL           (optional) — verified sender; defaults to
 *                                 "ACE Engineering <noreply@ace-engineering.co>"
 *  - TURNSTILE_SECRET_KEY         (optional) — enables Cloudflare Turnstile
 *  - NEXT_PUBLIC_TURNSTILE_SITE_KEY (optional) — its client-side pair
 *
 * The recipient is site.email (lib/site.config.ts). Reply-To is set to the
 * enquirer so the team can respond directly from their inbox.
 */

const FROM_DEFAULT = "ACE Engineering <noreply@ace-engineering.co>";

/** Verify a Cloudflare Turnstile token. Enabled when the secret is set. */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // bot protection not configured — allow
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) })
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return false;
  }
}

/** Server-side mirror of the client validators, plus hard length caps. */
function validate(body: Record<string, unknown>): ContactSubmission | null {
  const s = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const d: ContactSubmission = {
    name: s(body.name, 200),
    title: s(body.title, 200),
    company: s(body.company, 200),
    email: s(body.email, 320),
    phone: s(body.phone, 32),
    sector: s(body.sector, 100),
    load: s(body.load, 100),
    location: s(body.location, 200),
    message: s(body.message, 5000)
  };

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email);
  const phoneOk = /^\+[0-9\s()-]{6,}$/.test(d.phone);
  if (d.name.length < 2 || d.company.length < 2 || !emailOk || !phoneOk || !d.sector || d.message.length < 20) {
    return null;
  }
  return d;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success so
  // bots get no signal.
  if (typeof body.website === "string" && body.website !== "") {
    return NextResponse.json({ ok: true });
  }

  const data = validate(body);
  if (!data) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const captchaOk = await verifyTurnstile(
    typeof body.captchaToken === "string" ? body.captchaToken : "",
    ip
  );
  if (!captchaOk) {
    return NextResponse.json({ error: "Verification failed — please try again." }, { status: 403 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const { subject, html, text } = renderContactEmail(data);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || FROM_DEFAULT,
      to: [site.email],
      replyTo: data.email,
      subject,
      html,
      text,
      attachments: [
        {
          filename: "ace-logo.png",
          content: EMAIL_LOGO_PNG_BASE64,
          contentId: "ace-logo",
          contentType: "image/png"
        }
      ]
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "The enquiry could not be sent." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "The enquiry could not be sent." }, { status: 502 });
  }
}
