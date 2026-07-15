import Reveal from "./Reveal";

/* TODO: replace with the client's About Us document when received. */
const principles = [
  {
    title: "Speed with discipline",
    body: "Fast-track delivery backed by rigorous engineering — mobilisation measured in weeks, built to run for years."
  },
  {
    title: "One accountable partner",
    body: "From feasibility to first power to long-term O&M, a single team owns the outcome end to end."
  },
  {
    title: "Proven leadership",
    body: "A founding team with decades of combined delivery experience across power generation, energy infrastructure and industrial projects in the region and beyond."
  }
];

/** Formal white section — no group affiliations, company stands on its own. */
export default function About() {
  return (
    <section id="about" className="relative z-10 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="spec text-amp">Company</p>
            <h2 className="display mt-4 text-5xl text-deep md:text-6xl">
              Engineering-led. Delivery-obsessed.
            </h2>
            <p className="mt-6 text-slate">
              ACE Engineering is a power solutions company serving markets where
              energy demand has outgrown supply. We design, deliver and operate
              generation assets — generators, turbines and complete power plants —
              for clients who measure downtime in real money.
            </p>
            <p className="mt-4 text-slate">
              Senior engineers lead every engagement, from the first feasibility
              conversation to long-term operations.
            </p>
          </Reveal>

          <div className="flex flex-col justify-center gap-6">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} y={18}>
                <div className="border-l-2 border-amp bg-cloud p-7">
                  <h3 className="display text-2xl text-deep">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
