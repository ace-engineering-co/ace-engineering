"use client";
import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import Reveal from "./Reveal";
import { site, waLink } from "../lib/site.config";

const sectors = [
  "Data centers",
  "Oil & gas",
  "Mining",
  "Industrial & manufacturing",
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

/** Field-level validators — return an error string or empty. */
const validators: Partial<Record<keyof Form, (v: string) => string>> = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
  company: (v) => (v.trim().length >= 2 ? "" : "Please enter your company name."),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid business email.",
  phone: (v) => (v && isValidPhoneNumber(v) ? "" : "Please enter a valid mobile number."),
  sector: (v) => (v ? "" : "Please select a sector."),
  message: (v) => (v.trim().length >= 20 ? "" : "Please describe the requirement (min. 20 characters).")
};

export default function Contact() {
  const [form, setForm] = useState<Form>(initial);
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errorFor = (k: keyof Form): string => {
    const fn = validators[k];
    if (!fn) return "";
    if (!touched[k] && !submitted) return "";
    return fn(form[k]);
  };

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const blur = (k: keyof Form) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const firstInvalid = (Object.keys(validators) as (keyof Form)[]).find((k) => validators[k]!(form[k]));
    if (firstInvalid) {
      document.getElementsByName(firstInvalid)[0]?.focus();
      return;
    }
    const lines = [
      `Name: ${form.name}`,
      `Job title: ${form.title || "—"}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Mobile: ${form.phone}`,
      `Sector: ${form.sector}`,
      `Power requirement: ${form.load || "—"}`,
      `Project location: ${form.location || "—"}`,
      "",
      "Requirement:",
      form.message
    ];
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Enquiry — ${form.company} (${form.sector})`
    )}&body=${encodeURIComponent(lines.join("\n")).replace(/%0A/g, "%0D%0A")}`;
  };

  const base =
    "w-full border bg-white px-4 py-3 text-sm text-deep placeholder-slate/50 outline-none transition-colors";
  const field = (k: keyof Form) =>
    `${base} ${errorFor(k) ? "border-red-400 focus:border-red-500" : "border-hairline focus:border-amp"}`;

  const Err = ({ k }: { k: keyof Form }) =>
    errorFor(k) ? (
      <p role="alert" className="mt-1.5 text-xs text-red-500">
        {errorFor(k)}
      </p>
    ) : null;

  const label = "spec mb-1.5 block text-slate/70";

  return (
    <section id="contact" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-wrap gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal>
          <p className="spec text-amp">Contact</p>
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
              <dt className="spec text-slate/70">Offices</dt>
              <dd className="mt-1 text-lg text-deep">{site.location}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="border border-hairline bg-cloud p-8">
            <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className={label}>Full name *</label>
                <input id="c-name" name="name" required autoComplete="name" placeholder="Your full name"
                  aria-invalid={!!errorFor("name")}
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
                <input id="c-company" name="company" required autoComplete="organization" placeholder="Company / organisation"
                  aria-invalid={!!errorFor("company")}
                  className={field("company")} value={form.company} onChange={set("company")} onBlur={blur("company")} />
                <Err k="company" />
              </div>
              <div>
                <label htmlFor="c-email" className={label}>Business email *</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="name@company.com"
                  aria-invalid={!!errorFor("email")}
                  className={field("email")} value={form.email} onChange={set("email")} onBlur={blur("email")} />
                <Err k="email" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="c-phone" className={label}>Mobile *</label>
                <PhoneInput
                  international
                  defaultCountry="AE"
                  flags={flags}
                  countryCallingCodeEditable={false}
                  value={form.phone || undefined}
                  onChange={(v) => setForm((f) => ({ ...f, phone: v || "" }))}
                  onBlur={blur("phone")}
                  numberInputProps={{
                    id: "c-phone",
                    name: "phone",
                    required: true,
                    autoComplete: "tel",
                    "aria-invalid": !!errorFor("phone"),
                    className: field("phone")
                  }}
                  className={errorFor("phone") ? "phone-invalid" : undefined}
                />
                <Err k="phone" />
              </div>

              <div>
                <label htmlFor="c-sector" className={label}>Sector *</label>
                <select id="c-sector" name="sector" required
                  aria-invalid={!!errorFor("sector")}
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
                  aria-invalid={!!errorFor("message")}
                  className={`${field("message")} resize-none`}
                  value={form.message} onChange={set("message")} onBlur={blur("message")} />
                <Err k="message" />
              </div>
            </div>

            <button
              type="submit"
              className="spec mt-6 w-full bg-amp py-4 font-medium text-ink transition-colors hover:bg-deep hover:text-paper"
            >
              Submit
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
