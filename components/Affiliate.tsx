import Image from "next/image";
import Reveal from "./Reveal";
import { site } from "../lib/site.config";

const steps = [
  {
    title: "Introduce",
    body: "Register an opportunity — a data centre expansion, a utility capacity shortfall, a major industrial development."
  },
  {
    title: "We qualify & engage",
    body: "Our commercial team validates the requirement and leads the engagement under a documented referral agreement."
  },
  {
    title: "You are remunerated",
    body: "Commission is paid on closed contract value under transparent, contracted terms."
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
        style={{ background: "radial-gradient(closest-side, #F58220, transparent 70%)", filter: "blur(40px)" }}
      />
      <div className="grain" />

      <div className="relative mx-auto max-w-wrap px-5 lg:px-8">
        <Reveal>
          <p className="spec text-amp">Partner programme</p>
          <h2 className="display mt-4 max-w-3xl text-4xl text-paper md:text-5xl">
            Strategic referral partnerships.
          </h2>
          <p className="mt-6 max-w-3xl text-haze">
            ACE Engineering operates a structured referral programme for consultants,
            advisers and industry partners. Qualified introductions are commissioned
            on closed contract value under transparent, contracted terms.
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

        <div className="mt-14 grid gap-8 border-t border-linedark/50 pt-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} y={24}>
              <div className="flex items-start gap-4">
                <span className="spec mt-1 text-amp">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display text-xl text-paper">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-haze/90">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
