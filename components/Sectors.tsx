import Image from "next/image";
import Reveal from "./Reveal";

const sectors = [
  {
    name: "Data centers",
    detail: "Reliable and scalable infrastructure solutions that support uptime, resilience and rapid deployment",
    img: "/img/sector-dc.webp",
    feature: true
  },
  {
    name: "Oil & gas",
    detail: "Upstream, midstream and downstream operations supported through integrated energy, fabrication and offshore solutions",
    img: "/img/sector-og.webp"
  },
  {
    name: "Mining",
    detail: "Dependable infrastructure solutions for remote and demanding operating environments",
    img: "/img/sector-mining.webp"
  },
  {
    name: "Industrial & manufacturing",
    detail: "Industrial growth supported through reliable power, electrical infrastructure and packaged equipment solutions",
    img: "/img/sector-ind.webp"
  }
];

/** Formal light section; every card carries imagery, the high-demand card keeps its badge. */
export default function Sectors() {
  return (
    <section id="sectors" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-cloud py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-5 lg:px-8">
        <Reveal>
          <p className="spec text-amp">Industries</p>
          <h2 className="display mt-4 max-w-3xl text-4xl text-deep sm:text-5xl md:text-6xl">
            Built for critical industries.
          </h2>
          <p className="mt-6 max-w-2xl text-slate">
            Data centers, oil &amp; gas, mining and industrial operations — the
            sectors where reliability, resilience and delivery certainty decide
            outcomes.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {sectors.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06} y={18} className="h-full">
              <div
                className={`group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  s.feature ? "border-amp" : "border-hairline hover:border-amp/50"
                }`}
              >
                <Image
                  src={s.img}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
                <div className="relative">
                  {s.feature && (
                    <p
                      className="spec mb-3 flex items-center gap-2"
                      style={{
                        /* neon: bright core + amp-blue halo so it stays legible over the photo */
                        color: "#EAF2FC",
                        textShadow:
                          "0 0 3px rgba(234,242,252,0.6), 0 0 8px rgba(127,166,217,1), 0 0 18px rgba(46,111,242,0.9), 0 0 32px rgba(46,111,242,0.6), 0 1px 3px rgba(4,14,28,0.9)"
                      }}
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amp/60" />
                        <span
                          className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amp"
                          style={{ boxShadow: "0 0 6px rgba(127,166,217,0.9), 0 0 12px rgba(46,111,242,0.7)" }}
                        />
                      </span>
                      High demand
                    </p>
                  )}
                  <h3 className="display text-2xl text-paper">{s.name}</h3>
                </div>
                <p className="relative mt-4 text-sm text-haze">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
