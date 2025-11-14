import { motion, useReducedMotion } from "framer-motion";

const items = [
  {
    title: "Ticket Holders",
    body: "Prove your attendance with an immutable, verifiable credential."
  },
  {
    title: "Speakers",
    body: "Establish authentic speaking credentials for your professional profile."
  },
  {
    title: "Event Organizers",
    body: "Verify attendee authenticity instantly and eliminate fraud."
  }
];

export function PerfectFor() {
  const shouldReduce = useReducedMotion();
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Perfect For</h2>
        </div>
        <div className="grid gap-4 md:grid-columns-3 md:grid-cols-3">
          {items.map((it) => (
            <motion.div
              key={it.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-white/70">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


