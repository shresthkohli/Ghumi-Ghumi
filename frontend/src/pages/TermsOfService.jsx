import { useRef } from "react";
import { FileCheck, AlertCircle, RefreshCw, Scale, BookOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function TermsOfService() {
  const containerRef = useRef(null);

  const clauses = [
    {
      number: "01",
      icon: FileCheck,
      title: "Acceptance of Terms",
      text: "By accessing or using the Wanderly platform, itineraries, or concierge booking services, you agree to be bound by these Terms of Service. If you do not agree to all terms, please discontinue platform usage immediately.",
    },
    {
      number: "02",
      icon: Scale,
      title: "Bookings & Reservations",
      text: "All expedition bookings are subject to availability and confirmation upon receipt of the initial deposit. Prices are quoted in INR and may vary based on seasonal tariffs, hotel surcharges, or local guide availability.",
    },
    {
      number: "03",
      icon: RefreshCw,
      title: "Cancellations & Refund Policy",
      text: "Cancellations made 30 days prior to departure receive a 90% refund. Cancellations between 15-29 days receive a 50% refund. Cancellations made within 14 days of departure are non-refundable due to pre-booked hotel and guide commitments.",
    },
    {
      number: "04",
      icon: AlertCircle,
      title: "User Conduct & Liability",
      text: "Explorers are responsible for maintaining valid travel documents, personal insurance, and adhering to local laws. Wanderly is not liable for weather disruptions, flight delays, or force majeure events during expeditions.",
    },
  ];

  useGSAP(
    () => {
      // 1. Hero Entrance
      gsap.fromTo(
        ".tos-hero > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );

      // 2. Intro Statement Card
      gsap.fromTo(
        ".tos-intro",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tos-intro",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 3. 2-Column Clause Cards Grid Stagger
      gsap.fromTo(
        ".clause-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".clauses-grid",
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
      {/* Hero Header - Distinct Split Header */}
      <section className="bg-surface-container-high px-6 py-16 md:px-margin-desktop border-b border-outline-variant/20">
        <div className="tos-hero mx-auto max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="eyebrow inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-primary">
              <BookOpen className="h-3.5 w-3.5" />
              Agreement & Terms
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-on-surface md:text-5xl">
              Terms of Service
            </h1>
          </div>
          <div className="font-body text-xs md:text-sm text-on-surface-variant bg-surface/60 px-4 py-2 rounded-full border border-outline-variant/30 w-fit shrink-0">
            Last Updated: August 10, 2026 • Version 2.1
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-6 py-16 max-w-6xl mx-auto space-y-12">
        {/* Intro Callout Box */}
        <div className="tos-intro glass-widget rounded-2xl p-6 md:p-8 border border-outline-variant/20 leading-relaxed text-on-surface-variant font-body text-base">
          <p>
            Welcome to <strong>Wanderly</strong>. These Terms of Service govern your access to and use of our website, mobile interface, and expedition concierge services. Please read them carefully before making any travel reservations.
          </p>
        </div>

        {/* 2-Column Clauses Grid */}
        <div className="clauses-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {clauses.map((clause) => {
            const Icon = clause.icon;
            return (
              <div
                key={clause.number}
                className="clause-card relative rounded-2xl bg-surface-container/60 p-8 border border-outline-variant/20 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-container/20 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-sm font-bold text-primary/70 bg-primary-container/10 px-3 py-1 rounded-full border border-primary/20">
                      {clause.number}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-bold text-on-surface mb-3">
                    {clause.title}
                  </h2>

                  <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                    {clause.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default TermsOfService;
