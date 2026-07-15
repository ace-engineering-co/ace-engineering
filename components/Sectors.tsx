import Reveal from "./Reveal";

const sectors = [
  {
    name: "Data centres",
    detail: "Prime, bridge and backup power for AI-era compute loads",
    feature: true
  },
  { name: "Utilities & IPPs", detail: "Grid support, peak shaving, emergency capacity" },
  { name: "Oil & gas", detail: "Remote-site and offshore power packages" },
  { name: "Manufacturing", detail: "Continuous-process and heavy industrial loads" },
  { name: "Construction & mining", detail: "Temporary site power at any scale" },
  { name: "Events & critical facilities", detail: "Redundant power where failure isn't an option" }
];

/** Formal white section. */
export default function Sectors() {
  return (
    <section id="sectors" className="relative z-10 bg-cloud py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-5 lg:px-8">
        <Reveal>
          <p className="spec text-amp">Where we work</p>
          <h2 className="display mt-4 max-w-3xl text-5xl text-deep md:text-6xl">
            Built for the loads that can&apos;t wait.
          </h2>
          <p className="mt-6 max-w-2xl text-slate">
            Global electricity demand is growing faster than grids can expand — and
            nowhere faster than compute. We deploy generation where the shortfall
            is, for the sectors that carry it.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06} y={18}>
              <div
                className={`flex h-full flex-col justify-between border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  s.feature ? "border-amp" : "border-hairline hover:border-amp/50"
                }`}
              >
                <div>
                  {s.feature && <p className="spec mb-3 text-amp">High demand</p>}
                  <h3 className="display text-2xl text-deep">{s.name}</h3>
                </div>
                <p className="mt-4 text-sm text-slate">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
