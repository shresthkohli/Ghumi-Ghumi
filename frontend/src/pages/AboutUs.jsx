import { useRef } from "react";
import { Link } from "react-router-dom";
import { Compass, Heart, Shield, Award, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function AboutUs() {
  const containerRef = useRef(null);

  const values = [
    {
      icon: Compass,
      title: "Curated Excellence",
      description: "We handpick every destination, accommodation, and local experience to ensure authentic, unforgettable adventures.",
    },
    {
      icon: Heart,
      title: "Mindful Exploration",
      description: "Promoting travel that respects local traditions, protects delicate ecosystems, and enriches indigenous communities.",
    },
    {
      icon: Shield,
      title: "Uncompromising Quality",
      description: "Dedicated concierge support, verified local guides, and top-tier safety standards across every journey.",
    },
    {
      icon: Award,
      title: "Heritage Preservation",
      description: "Celebrating India's timeless architecture, rich culinary traditions, and centuries of living cultural legacy.",
    },
  ];

  const stats = [
    { label: "Curated Destinations", value: "50+" },
    { label: "Satisfied Explorers", value: "10,000+" },
    { label: "Verified Local Guides", value: "200+" },
    { label: "Community Projects Supported", value: "35+" },
  ];

  useGSAP(
    () => {
      // 1. Hero Entrance
      gsap.fromTo(
        ".hero-content > *",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }
      );

      // 2. Stats Bar
      gsap.fromTo(
        ".stat-box",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 85%",
            once: true,
          },
        }
      );

      // 3. Values Section
      gsap.fromTo(
        ".values-header > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".values-section",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".value-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 85%",
            once: true,
          },
        }
      );

      // 4. CTA Section
      gsap.fromTo(
        ".cta-box",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cta-box",
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-on-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-container-high px-6 py-20 md:px-margin-desktop md:py-28">
        <div className="absolute top-10 left-1/4 h-72 w-72 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
        <div className="hero-content relative mx-auto max-w-4xl text-center">
          <span className="eyebrow font-body text-xs font-bold uppercase tracking-widest text-primary">
            Our Story & Vision
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-on-surface md:text-5xl lg:text-6xl">
            Crafting Extraordinary Narratives for the Discerning Explorer
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-on-surface-variant max-w-2xl mx-auto">
            Wanderly was born out of a passion for deep, immersive travel. We believe that true journeying goes beyond sightseeing—it connects you to the soul of a destination.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-section border-y border-outline-variant/30 bg-surface-container py-12 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-box p-4">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-2 font-body text-sm font-medium text-on-surface-variant">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section px-6 py-20 md:px-margin-desktop max-w-7xl mx-auto">
        <div className="values-header text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">
            The Pillars of Wanderly
          </h2>
          <p className="mt-4 font-body text-base text-on-surface-variant">
            Our guiding principles shape every itinerary, partner connection, and guest experience.
          </p>
        </div>

        <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="value-card glass-widget rounded-2xl p-8 border border-outline-variant/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container/20 text-primary mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-on-surface">
                  {val.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-on-surface-variant">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 md:px-margin-desktop">
        <div className="cta-box mx-auto max-w-5xl rounded-3xl bg-surface-container-high border border-outline-variant/30 p-10 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">
              Ready to Begin Your Next Expedition?
            </h2>
            <p className="mt-4 font-body text-base text-on-surface-variant max-w-xl mx-auto">
              Discover hand-crafted itineraries, royal heritage retreats, and breath-taking landscapes across India.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/destinations"
                className="glossy-button inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-body text-sm font-semibold text-white transition-all shadow-md hover:scale-105"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
