"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { site, waLink } from "../lib/site.config";

/** Formal white closing section. */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0A%0D%0A${encodeURIComponent(form.message)}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "Enquiry — " + form.name
    )}&body=${body}`;
  };

  const field =
    "w-full border border-hairline bg-white px-4 py-3 text-sm text-deep placeholder-slate/50 outline-none transition-colors focus:border-amp";

  return (
    <section id="contact" className="relative z-10 bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-wrap gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="spec text-amp">Contact</p>
          <h2 className="display mt-4 text-5xl text-deep md:text-6xl">
            Tell us about your power requirement.
          </h2>
          <p className="mt-6 max-w-md text-slate">
            A senior engineer — not a call centre — reviews every enquiry. Expect
            a response within one business day.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="spec text-slate/70">WhatsApp</dt>
              <dd className="mt-1">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-deep transition-colors hover:text-amp"
                >
                  Message us directly →
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
              <dt className="spec text-slate/70">Location</dt>
              <dd className="mt-1 text-lg text-deep">{site.location}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={submit} className="border border-hairline bg-cloud p-8">
            <input
              required
              placeholder="Your name"
              className={field}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Email"
              className={`${field} mt-4`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              required
              rows={6}
              placeholder="Describe your requirement — location, load, timeline…"
              className={`${field} mt-4 resize-none`}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button
              type="submit"
              className="spec mt-6 w-full bg-amp py-4 font-medium text-ink transition-colors hover:bg-deep hover:text-paper"
            >
              Send enquiry
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
