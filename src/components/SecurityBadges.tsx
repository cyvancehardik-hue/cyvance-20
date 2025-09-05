import { Badge } from "@/components/ui/badge";

const certifications = [
  "SOC 2 Type II",
  "ISO 27001",
  "NIST Framework",
  "GDPR Compliant",
  "HIPAA Ready",
  "FedRAMP"
];

export const SecurityBadges = () => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {certifications.map((cert, index) => (
        <Badge
          key={cert}
          variant="outline"
          className="px-4 py-2 text-xs font-mono bg-gradient-to-r from-[hsl(var(--card)/0.5)] to-[hsl(var(--card)/0.3)] border-[hsl(var(--neon-blue)/0.3)] text-foreground hover:border-[hsl(var(--neon-blue)/0.6)] transition-all duration-300 hover:shadow-[0_0_12px_hsl(var(--neon-blue)/0.3)]"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {cert}
        </Badge>
      ))}
    </div>
  );
};