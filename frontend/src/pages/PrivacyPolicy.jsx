import { useRef } from "react";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function PrivacyPolicy() {
  const containerRef = useRef(null);

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content:
        "We collect personal information that you provide directly to us when registering an account, booking an itinerary, or contacting our concierge. This includes your name, email address, phone number, payment information, and travel preferences.",
    },
    {
      icon: Lock,
      title: "2. How We Use Your Data",
      content:
        "Your data is strictly used to customize expedition itineraries, process bookings, provide customer support, improve our digital platform, and send personalized recommendations. We do not sell your personal data to third parties.",
    },
    {
      icon: ShieldCheck,
      title: "3. Data Security & Storage",
      content:
        "We implement industry-standard encryption protocols (TLS/SSL) and secure cloud infrastructure to protect your personal details against unauthorized access, disclosure, alteration, or destruction.",
    },
    {
      icon: FileText,
      title: "4. Your Rights & Choices",
      content:
        "You have the right to request access to, correction of, or deletion of your personal data at any time. You can also opt out of marketing communications via your profile settings or by contacting our Privacy Team.",
    },
  ];

  useGSAP(
    () => {
      // 1. Header Entrance
      gsap.fromTo(
        ".header-content > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );

      // 2. Intro Card
      gsap.fromTo(
        ".intro-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".intro-card",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 3. Policy Sections Stagger
      gsap.fromTo(
        ".policy-item",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".policy-list",
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
      {/* Header */}
      <section className="bg-surface-container-high px-6 py-16 md:px-margin-desktop text-center border-b border-outline-variant/20">
        <div className="header-content mx-auto max-w-3xl">
          <span className="eyebrow font-body text-xs font-bold uppercase tracking-widest text-primary">
            Legal & Transparency
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-on-surface md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 font-body text-sm text-on-surface-variant">
            Last Updated: August 10, 2026 • Effective Date: January 1, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16 max-w-4xl mx-auto space-y-10">
        <div className="intro-card glass-widget rounded-2xl p-8 border border-outline-variant/20 leading-relaxed text-on-surface-variant font-body text-base">
          <p>
            At <strong>Wanderly</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to safeguarding your privacy and protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your details when you visit our website or engage our expedition services.
          </p>
        </div>

        <div className="policy-list space-y-8">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.title}
                className="policy-item rounded-2xl bg-surface-container/60 p-8 border border-outline-variant/20 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container/20 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-on-surface">
                    {sec.title}
                  </h2>
                </div>
                <p className="font-body text-base leading-relaxed text-on-surface-variant pl-13">
                  {sec.content}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
