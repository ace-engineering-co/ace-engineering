"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Reveal from "./Reveal";
import { site, waLink } from "../lib/site.config";

/* Cloudflare Turnstile bot protection. Inlined at build time; when unset the
   widget is skipped entirely and the form still works (honeypot + server
   validation remain). */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
    __onTurnstileLoad?: () => void;
  }
}

/* Loaded lazily — see PhoneField.tsx. The placeholder mirrors the final
   input's box so the swap causes no layout shift. */
const PhoneField = dynamic(() => import("./PhoneField"), {
  ssr: false,
  loading: () => (
    <input
      disabled
      placeholder="+971"
      aria-label="Mobile number (loading)"
      className="w-full border border-hairline bg-white px-4 py-3 text-sm text-deep placeholder-slate/50 outline-none"
    />
  )
});

const sectors = [
  "Data centers",
  "Oil & gas",
  "Mining",
  "Industrial & manufacturing",
  "Utility",
  "Rental",
  "Marine",
  "Commercial & Residential",
  "Hospitality",
  "Other"
];

const loads = ["< 1 MW", "1 – 10 MW", "10 – 50 MW", "50 – 200 MW", "200+ MW", "To be determined"];

type Form = {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string; // E.164 from react-phone-number-input
  sector: string;
  load: string;
  location: string;
  message: string;
};

const initial: Form = {
  name: "",
  title: "",
  company: "",
  email: "",
  phone: "",
  sector: "",
  load: "",
  location: "",
  message: ""
};

/** Field-level validators — return an error string or empty. Phone validity
    is reported by PhoneField (which owns the libphonenumber dependency). */
const validators: Partial<Record<keyof Form, (v: string) => string>> = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
  company: (v) => (v.trim().length >= 2 ? "" : "Please enter your company name."),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid business email.",
  sector: (v) => (v ? "" : "Please select a sector."),
  message: (v) => (v.trim().length >= 20 ? "" : "Please describe the requirement (min. 20 characters).")
};

/** Validation order for focusing the first invalid field on submit. */
const REQUIRED: (keyof Form)[] = ["name", "company", "email", "phone", "sector", "message"];

/**
 * Consultation form + contact details. Client-validated per field (errors
 * appear on blur or submit), then POSTs JSON to /api/contact which delivers
 * the enquiry by email. Spam control: honeypot + lazily-mounted Cloudflare
 * Turnstile. On success the form is replaced by a confirmation panel; on
 * failure an inline message offers the direct email address.
 */
export default function Contact() {
  const [form, setForm] = useState<Form>(initial);
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  /* Load the Turnstile script only when the contact section approaches the
     viewport, then render an interaction-only widget (visible solely when
     Cloudflare decides a challenge is needed). */
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const section = document.getElementById("contact");
    if (!section) return;
    const render = () => {
      if (!turnstileRef.current || widgetId.current !== undefined || !window.turnstile) return;
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: "interaction-only",
        callback: (token: string) => setCaptchaToken(token),
        "expired-callback": () => setCaptchaToken(""),
        "error-callback": () => setCaptchaToken("")
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (window.turnstile) {
          render();
          return;
        }
        window.__onTurnstileLoad = render;
        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__onTurnstileLoad";
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      },
      { rootMargin: "300px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fieldError = (k: keyof Form): string => {
    if (k === "phone")
      return form.phone && phoneValid ? "" : "Please enter a valid mobile number.";
    const fn = validators[k];
    return fn ? fn(form[k]) : "";
  };

  const errorFor = (k: keyof Form): string => {
    if (!touched[k] && !submitted) return "";
    return fieldError(k);
  };

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const blur = (k: keyof Form) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const firstInvalid = REQUIRED.find((k) => fieldError(k));
    if (firstInvalid) {
      document.getElementsByName(firstInvalid)[0]?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot, captchaToken })
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("sent");
    } catch {
      // Tokens are single-use — get a fresh one before the user retries
      setCaptchaToken("");
      window.turnstile?.reset(widgetId.current);
      setStatus("error");
    }
  };

  const base =
    "w-full border bg-white px-4 py-3 text-sm text-deep placeholder-slate/50 outline-none transition-colors";
  const field = (k: keyof Form) =>
    `${base} ${errorFor(k) ? "border-red-400 focus:border-red-500" : "border-hairline focus:border-amp"}`;

  /** Props linking a field to its error message for screen readers. */
  const ariaErr = (k: keyof Form) => ({
    "aria-invalid": !!errorFor(k),
    "aria-describedby": errorFor(k) ? `c-err-${k}` : undefined
  });

  const Err = ({ k }: { k: keyof Form }) =>
    errorFor(k) ? (
      <p id={`c-err-${k}`} role="alert" className="mt-1.5 text-xs text-red-500">
        {errorFor(k)}
      </p>
    ) : null;

  const label = "spec mb-1.5 block text-slate/70";

  return (
    <section id="contact" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-wrap gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal>
          <p className="spec text-ampdeep">Contact</p>
          <h2 className="display mt-4 text-4xl text-deep sm:text-5xl md:text-6xl">
            Request a consultation.
          </h2>
          <p className="mt-6 max-w-md text-slate">
            Developing a new infrastructure project, sourcing critical equipment,
            evaluating offshore assets or structuring a complex opportunity — we
            can help you identify the right solution pathway.
          </p>
          <p className="mt-4 max-w-md text-slate">
            Prefer a quick message?{" "}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-b border-amp/50 font-medium text-deep transition-colors hover:border-amp hover:text-amp"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
                <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.18 8.18 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.58-.35Z" />
                <path d="M12.04 2a9.9 9.9 0 0 0-8.57 14.86L2 22l5.27-1.38A9.94 9.94 0 1 0 12.04 2Zm0 18.15c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.13.82.84-3.05-.2-.31a8.26 8.26 0 1 1 7.04 3.88Z" />
              </svg>
              Contact us via WhatsApp
            </a>
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="spec text-slate/70">Telephone (UAE)</dt>
              <dd className="mt-1">
                <a
                  href={site.phoneHref}
                  className="text-lg text-deep transition-colors hover:text-amp"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="spec text-slate/70">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="text-lg text-deep transition-colors hover:text-amp"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="spec text-slate/70">Office</dt>
              <dd className="mt-1 text-base leading-relaxed text-deep">
                {site.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          {status === "sent" ? (
            <div
              role="status"
              className="flex h-full min-h-[24rem] flex-col items-center justify-center border border-hairline bg-cloud p-10 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amp">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7FA6D9" strokeWidth="2.5" aria-hidden>
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
              </span>
              <h3 className="display mt-6 text-3xl text-deep">Enquiry received.</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate">
                Thank you — your consultation request has been sent to our team.
                We will get back to you shortly.
              </p>
            </div>
          ) : (
          <form onSubmit={submit} noValidate className="border border-hairline bg-cloud p-8">
            {/* Honeypot — hidden from real users, bots fill it and get dropped */}
            <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
              <label htmlFor="c-website">Website</label>
              <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className={label}>Full name *</label>
                <input id="c-name" name="name" required autoComplete="name" placeholder="Your full name"
                  {...ariaErr("name")}
                  className={field("name")} value={form.name} onChange={set("name")} onBlur={blur("name")} />
                <Err k="name" />
              </div>
              <div>
                <label htmlFor="c-title" className={label}>Job title</label>
                <input id="c-title" name="title" autoComplete="organization-title" placeholder="e.g. Facilities Director"
                  className={field("title")} value={form.title} onChange={set("title")} onBlur={blur("title")} />
              </div>
              <div>
                <label htmlFor="c-company" className={label}>Company *</label>
                <input id="c-company" name="company" required autoComplete="organization" placeholder="Company / organization"
                  {...ariaErr("company")}
                  className={field("company")} value={form.company} onChange={set("company")} onBlur={blur("company")} />
                <Err k="company" />
              </div>
              <div>
                <label htmlFor="c-email" className={label}>Business email *</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="name@company.com"
                  {...ariaErr("email")}
                  className={field("email")} value={form.email} onChange={set("email")} onBlur={blur("email")} />
                <Err k="email" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="c-phone" className={label}>Mobile *</label>
                <PhoneField
                  value={form.phone}
                  invalid={!!errorFor("phone")}
                  inputClassName={field("phone")}
                  onChange={(v, isValid) => {
                    setForm((f) => ({ ...f, phone: v }));
                    setPhoneValid(isValid);
                  }}
                  onBlur={blur("phone")}
                />
                <Err k="phone" />
              </div>

              <div>
                <label htmlFor="c-sector" className={label}>Sector *</label>
                <select id="c-sector" name="sector" required
                  {...ariaErr("sector")}
                  className={`${field("sector")} ${form.sector ? "" : "text-slate/50"}`}
                  value={form.sector} onChange={set("sector")} onBlur={blur("sector")}>
                  <option value="" disabled>Select sector</option>
                  {sectors.map((s) => (
                    <option key={s} value={s} className="text-deep">{s}</option>
                  ))}
                </select>
                <Err k="sector" />
              </div>
              <div>
                <label htmlFor="c-load" className={label}>Power requirement (if any)</label>
                <select id="c-load" name="load"
                  className={`${field("load")} ${form.load ? "" : "text-slate/50"}`}
                  value={form.load} onChange={set("load")}>
                  <option value="" disabled>Select range</option>
                  {loads.map((l) => (
                    <option key={l} value={l} className="text-deep">{l}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="c-location" className={label}>Project location</label>
                <input id="c-location" name="location" placeholder="City, country"
                  className={field("location")} value={form.location} onChange={set("location")} onBlur={blur("location")} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="c-message" className={label}>Requirement *</label>
                <textarea id="c-message" name="message" required rows={5}
                  placeholder="Scope, requirements, timeline and any constraints…"
                  {...ariaErr("message")}
                  className={`${field("message")} resize-none`}
                  value={form.message} onChange={set("message")} onBlur={blur("message")} />
                <Err k="message" />
              </div>
            </div>

            {/* Turnstile mounts here; visible only if Cloudflare challenges */}
            <div ref={turnstileRef} className="mt-4 empty:mt-0" />

            <button
              type="submit"
              disabled={status === "sending"}
              className="spec mt-6 w-full bg-amp py-4 font-medium text-ink transition-colors hover:bg-deep hover:text-paper disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Submit"}
            </button>
            {status === "error" && (
              <p role="alert" className="mt-4 text-center text-sm text-red-500">
                Something went wrong sending your enquiry. Please try again, or
                email us directly at{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>
                .
              </p>
            )}
          </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
