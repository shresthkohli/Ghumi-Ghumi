import { Link } from "react-router-dom";
import { Leaf, Recycle, HeartHandshake, ShieldCheck, ArrowRight, TreePine } from "lucide-react";
import Footer from "../components/common/Footer.jsx";

function Sustainability() {
  const initiatives = [
    {
      icon: Leaf,
      title: "Zero Single-Use Plastic",
      description: "We work directly with luxury stays and local partners to eliminate single-use plastics across all guided expeditions.",
    },
    {
      icon: HeartHandshake,
      title: "Local Community Equity",
      description: "Over 85% of expedition expenditure goes directly to indigenous artisans, local family-owned homestays, and regional guides.",
    },
    {
      icon: TreePine,
      title: "Carbon Offset Commitments",
      description: "Partnering with reforestation projects in the Western Ghats and Himalayan foothills to balance our travel footprint.",
    },
    {
      icon: ShieldCheck,
      title: "Ethical Wildlife Safaris",
      description: "Strict adherence to non-intrusive wildlife observing protocols in national parks like Jim Corbett and Ranthambore.",
    },
  ];

  const guidelines = [
    "Respect local cultural norms, dress conservatively at spiritual sites, and always seek consent before photography.",
    "Carry reusable water bottles and canvas bags during local bazaar excursions.",
    "Support regional artisans and craftspeople directly to preserve traditional livelihoods.",
    "Stay on marked trails to protect sensitive alpine and forest habitats.",
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface pt-[90px]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-container-high px-6 py-20 md:px-margin-desktop md:py-28">
        <div className="absolute top-10 right-1/4 h-72 w-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="eyebrow font-body text-xs font-bold uppercase tracking-widest text-secondary">
            Conscious Expeditions
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-on-surface md:text-5xl lg:text-6xl">
            Sustaining Landscapes & Empowering Communities
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-on-surface-variant max-w-2xl mx-auto">
            Travel should leave destinations richer, ecosystems healthier, and cultural legacies stronger. Discover how we tread lightly on earth.
          </p>
        </div>
      </section>

      {/* Initiatives */}
      <section className="px-6 py-20 md:px-margin-desktop max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">
            Our Sustainability Commitments
          </h2>
          <p className="mt-4 font-body text-base text-on-surface-variant">
            Actionable standards integrated into every journey we curate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="glass-widget rounded-2xl p-8 border border-outline-variant/20 flex gap-6 items-start"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary-container/40 text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-on-surface">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Explorer Guidelines */}
      <section className="px-6 py-16 bg-surface-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-on-surface text-center mb-10">
            The Explorer's Green Pledge
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guidelines.map((text, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-xl bg-surface p-6 border border-outline-variant/20 shadow-sm"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-white font-bold text-xs">
                  {idx + 1}
                </div>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:px-margin-desktop text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-on-surface">
            Join Us in Mindful Exploration
          </h3>
          <p className="mt-3 font-body text-sm text-on-surface-variant">
            Have questions about our eco-initiatives or local community partnerships?
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-secondary/90 shadow-md"
            >
              <span>Get In Touch</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sustainability;
