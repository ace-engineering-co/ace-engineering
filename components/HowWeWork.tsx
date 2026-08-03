import Reveal from "./Reveal";

const steps = [
  {
    title: "Understand the requirement",
    body: "We begin with project objectives, operational requirements, budget, schedule and technical constraints."
  },
  {
    title: "Develop the solution path",
    body: "We evaluate technical and commercial alternatives and identify the most practical approach."
  },
  {
    title: "Build the right ecosystem",
    body: "We engage the appropriate suppliers, fabricators, engineering specialists and delivery partners."
  },
  {
    title: "Structure the commercial framework",
    body: "We align commercial requirements, delivery obligations, milestones and risk allocation."
  },
  {
    title: "Support execution",
    body: "We provide coordination and delivery support throughout project execution."
  }
];

/** Light process band: five numbered stages from requirement to execution. */
export default function HowWeWork() {
  return (
    <section id="process" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-cloud py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-5 lg:px-8">
        <Reveal>
          <p className="spec text-ampdeep">How we work</p>
          <h2 className="display mt-4 max-w-3xl text-4xl text-deep sm:text-5xl md:text-6xl">
            A structured approach to delivery.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-6 gap-y-8 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} y={18} className="h-full">
              <div className="flex h-full flex-col border-l-2 border-amp bg-white p-6">
                <p className="spec text-ampdeep">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-4 text-xl text-deep">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
