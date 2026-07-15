"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { site } from "../lib/site.config";

/** Dark navy band — the one saturated moment in the lower page. */
export default function Affiliate() {
  const [form, setForm] = useState({ name: "", company: "", email: "", detail: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}%0D%0ACompany: ${form.company}%0D%0AEmail: ${form.email}%0D%0A%0D%0AOpportunity:%0D%0A${encodeURIComponent(form.detail)}`;
    window.location.href = `mailto:${site.affiliateEmail}?subject=${encodeURIComponent(
      "Affiliate referral — " + form.name
    )}&body=${body}`;
  };

  const field =
    "w-full border border-linedark bg-ink/60 px-4 py-3 text-sm text-paper placeholder-steel/60 outline-none transition-colors focus:border-amp";

  return (
    <section id="affiliate" className="relative z-10 bg-navy py-24 lg:py-32">
      <div className="mx-auto grid max-w-wrap gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="spec text-amp">Affiliate program</p>
          <h2 className="display mt-4 text-5xl text-paper md:text-6xl">
            Know someone who needs power? Get rewarded.
          </h2>
          <p className="mt-6 max-w-xl text-haze">
            Refer a qualified power requirement — a data centre expansion, a
            utility shortfall, an industrial project — and earn a commission when
            the deal closes. Simple terms, transparent tracking, no obligation.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Submit the opportunity through the form",
              "Our team qualifies and engages the client",
              "You earn a share of the closed contract value"
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <span className="spec mt-1 text-amp">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-haze">{step}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={submit} className="border border-linedark bg-ink/40 p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Your name"
                className={field}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Company (optional)"
                className={field}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
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
              rows={5}
              placeholder="Tell us about the opportunity — sector, location, approximate load…"
              className={`${field} mt-4 resize-none`}
              value={form.detail}
              onChange={(e) => setForm({ ...form, detail: e.target.value })}
            />
            <button
              type="submit"
              className="spec mt-6 w-full bg-amp py-4 font-medium text-ink transition-colors hover:bg-paper"
            >
              Submit referral
            </button>
            <p className="spec mt-4 text-center text-steel/70">
              Goes directly to our partnerships team
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
