"use client";
import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import Reveal from "./Reveal";
import { site } from "../lib/site.config";

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
          <h2 className="display mt-4 text-5xl text-deep md:text-6xl">
            Discuss your project.
          </h2>
          <p className="mt-6 max-w-md text-slate">
            Developing a new infrastructure project, sourcing critical equipment,
            evaluating offshore assets or structuring a complex opportunity — we
            can help you identify the right solution pathway.
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
              Submit enquiry
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
