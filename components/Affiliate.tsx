import Image from "next/image";
import Reveal from "./Reveal";
import { site } from "../lib/site.config";

const steps = [
  {
    title: "Register your interest",
    body: "Submit your details, your market focus and the type of opportunities you can introduce."
  },
  {
    title: "Receive your affiliate reference",
    body: "Once approved, you receive a unique referral code identifying opportunities introduced by you."
  },
  {
    title: "Introduce qualified opportunities",
    body: "Use your reference when introducing suppliers, OEMs, asset owners, developers or buyers."
  },
  {
    title: "Opportunity review",
    body: "We confirm whether the opportunity fits our solutions, markets and commercial model."
  },
  {
    title: "Earn commission",
    body: "Completed transactions may earn an agreed commission based on the final commercial terms."
  }
];

/** Compact corporate partner band — routes to email and the enquiry form. */
export default function Affiliate() {
  return (
    <section id="affiliate" className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-navy py-20 lg:py-24">
      <Image
        src="/img/affiliate-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/80 to-navy" aria-hidden />
      <div
        aria-hidden
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-25 mix-blend-screen"
        style={{ background: "radial-gradient(closest-side, #7FA6D9, transparent 70%)", filter: "blur(40px)" }}
      />
      <div className="grain" />

      <div className="relative mx-auto max-w-wrap px-5 lg:px-8">
        <Reveal>
          <p className="spec text-amp">Affiliate partner programme</p>
          <h2 className="display mt-4 max-w-3xl text-3xl text-paper md:text-4xl">
            Become an affiliate partner.
          </h2>
          <p className="mt-6 max-w-3xl text-haze">
            ACE Engineering works with a trusted network of industry professionals,
            suppliers, OEMs, asset owners and commercial partners. If you can
            introduce qualified opportunities within your network, you can partner
            with us — and earn an agreed commission when a referral leads to a
            completed transaction.
          </p>
          <p className="mt-5 max-w-3xl text-haze">
            To register as a referral partner, contact{" "}
            <a
              href={`mailto:${site.affiliateEmail}`}
              className="border-b border-amp/50 text-amp transition-colors hover:border-amp"
            >
              {site.affiliateEmail}
            </a>{" "}
            or{" "}
            <a
              href="#contact"
              className="border-b border-amp/50 text-amp transition-colors hover:border-amp"
            >
              submit an enquiry below
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 border-t border-linedark/50 pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} y={24}>
              <div className="flex items-start gap-4">
                <span className="spec mt-1 text-amp">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display text-lg text-paper">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-haze/90">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 max-w-3xl text-xs leading-relaxed text-steel">
            All referrals, commissions and commercial arrangements are subject to
            prior approval, conflict checks and agreed affiliate terms.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
