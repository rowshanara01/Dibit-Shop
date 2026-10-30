import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="section-container relative py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center animate-slide-up">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent-light">
            Premium Gaming Marketplace
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Level Up Your{" "}
            <span className="gradient-text">Gaming Experience</span>
          </h1>
          <p className="mt-6 text-lg text-muted sm:text-xl">
            Instant top-ups, premium accounts, digital products, and gift cards.
            Trusted by thousands of gamers worldwide.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/top-up">
              <Button size="lg">Start Top-Up</Button>
            </Link>
            <Link href="/games">
              <Button variant="secondary" size="lg">
                Browse Games
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in animate-delay-200">
          {[
            { value: "50K+", label: "Happy Gamers" },
            { value: "200+", label: "Games Supported" },
            { value: "99.9%", label: "Delivery Rate" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <p className="font-display text-2xl font-bold text-accent-light sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
