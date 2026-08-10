import Footer from "../components/common/Footer.jsx";
import { FileCheck, AlertCircle, RefreshCw, Scale } from "lucide-react";

function TermsOfService() {
  const clauses = [
    {
      icon: FileCheck,
      title: "1. Acceptance of Terms",
      text: "By accessing or using the Wanderly platform, itineraries, or concierge booking services, you agree to be bound by these Terms of Service. If you do not agree to all terms, please discontinue platform usage immediately.",
    },
    {
      icon: Scale,
      title: "2. Bookings & Reservations",
      text: "All expedition bookings are subject to availability and confirmation upon receipt of the initial deposit. Prices are quoted in INR and may vary based on seasonal tariffs, hotel surcharges, or local guide availability.",
    },
    {
      icon: RefreshCw,
      title: "3. Cancellations & Refund Policy",
      text: "Cancellations made 30 days prior to departure receive a 90% refund. Cancellations between 15-29 days receive a 50% refund. Cancellations made within 14 days of departure are non-refundable due to pre-booked hotel and guide commitments.",
    },
    {
      icon: AlertCircle,
      title: "4. User Conduct & Liability",
      text: "Explorers are responsible for maintaining valid travel documents, personal insurance, and adhering to local laws. Wanderly is not liable for weather disruptions, flight delays, or force majeure events during expeditions.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface pt-[90px]">
      {/* Header */}
      <section className="bg-surface-container-high px-6 py-16 md:px-margin-desktop text-center border-b border-outline-variant/20">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow font-body text-xs font-bold uppercase tracking-widest text-primary">
            Agreement & Policies
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-on-surface md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 font-body text-sm text-on-surface-variant">
            Last Updated: August 10, 2026 • Version 2.1
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16 max-w-4xl mx-auto space-y-10">
        <div className="glass-widget rounded-2xl p-8 border border-outline-variant/20 leading-relaxed text-on-surface-variant font-body text-base">
          <p>
            Welcome to <strong>Wanderly</strong>. These Terms of Service govern your access to and use of our website, mobile interface, and expedition concierge services. Please read them carefully before making any travel reservations.
          </p>
        </div>

        <div className="space-y-8">
          {clauses.map((clause) => {
            const Icon = clause.icon;
            return (
              <div
                key={clause.title}
                className="rounded-2xl bg-surface-container/60 p-8 border border-outline-variant/20 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container/20 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-on-surface">
                    {clause.title}
                  </h2>
                </div>
                <p className="font-body text-base leading-relaxed text-on-surface-variant pl-13">
                  {clause.text}
                </p>
              </div>
            );
          })}
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default TermsOfService;
