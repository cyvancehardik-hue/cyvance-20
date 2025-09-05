import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Cyvance reduced our threat surface by 72% within weeks.",
    author: "Amelia Hart",
    role: "CISO, NovaBank",
  },
  {
    quote: "Their red team found what others missed. Exceptional.",
    author: "Kenji Sato",
    role: "Head of Security, Orion Tech",
  },
  {
    quote: "Cloud posture is now airtight—compliance made painless.",
    author: "Sara Velasquez",
    role: "VP Engineering, Nimbus",
  },
  {
    quote: "Real-time risk visibility transformed our response time.",
    author: "Liam O’Connor",
    role: "CTO, Aether Logistics",
  },
];

const Card = ({ t }: { t: Testimonial }) => (
  <figure className="glow-card rounded-xl p-6 min-w-[280px] max-w-sm mr-6 backdrop-blur-sm hover:translate-y-[-2px] transition-transform duration-300">
    <blockquote className="text-sm text-muted-foreground leading-relaxed">“{t.quote}”</blockquote>
    <figcaption className="mt-4 text-sm">
      <div className="font-semibold text-foreground">{t.author}</div>
      <div className="text-xs text-muted-foreground">{t.role}</div>
    </figcaption>
  </figure>
);

const Row = ({ className }: { className?: string }) => (
  <div className={cn("flex items-stretch animate-marquee", className)}>
    {testimonials.concat(testimonials).map((t, i) => (
      <Card t={t} key={i} />
    ))}
  </div>
);

export const TestimonialsMarquee = () => {
  return (
    <div className="relative overflow-hidden">
      <Row />
    </div>
  );
};
