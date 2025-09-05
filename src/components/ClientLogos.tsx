const clients = [
  "TechCorp", "NovaBankSec", "CloudVault", "DataShield", 
  "CyberGuard", "SecureNet", "TrustFlow", "DefenseCore"
];

export const ClientLogos = () => {
  return (
    <div data-reveal className="mt-12">
      <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wider">
        Trusted by Industry Leaders
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        {clients.map((client, index) => (
          <div
            key={client}
            className="font-display text-lg tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300 hover:text-glow cursor-default"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {client}
          </div>
        ))}
      </div>
    </div>
  );
};