import { Mail, Sparkles } from "lucide-react";
import Footer from "../components/common/Footer.jsx";

function Contact() {
  const teamMembers = [
    {
      name: "Gitanshu Chavda",
      role: "Creator",
      email: "u25ai099@aid.svnit.ac.in",
      linkedin: "https://www.linkedin.com/in/gitanshu-c-a8a37728b/",
      avatar: "https://unavatar.io/linkedin/gitanshu-c-a8a37728b?fallback=false&t=1",
    },
    {
      name: "Shresth Kohli",
      role: "Creator",
      email: "u25cs004@coed.svnit.ac.in",
      linkedin: "https://www.linkedin.com/in/shresth-kohli/",
      avatar: "https://unavatar.io/linkedin/shresth-kohli?fallback=false",
    },
    {
      name: "Geet Lahoty",
      role: "Creator",
      email: "u25ai069@aid.svnit.ac.in",
      linkedin: "https://www.linkedin.com/in/geet-lahoty-8413223a6/",
      avatar: "https://unavatar.io/linkedin/geet-lahoty-8413223a6?fallback=false",
    },
    {
      name: "Kanishtha Maheshwari",
      role: "Creator",
      email: "i25ai013@aid.svnit.ac.in",
      linkedin: "https://www.linkedin.com/in/kanishtha-maheshwari/",
      avatar: "https://unavatar.io/linkedin/kanishtha-maheshwari?fallback=false",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface pt-[90px]">
      {/* Hero Header - Simple & Clean */}
      <section className="relative overflow-hidden bg-surface-container-high px-6 py-16 md:px-margin-desktop md:py-20 border-b border-outline-variant/20">
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="eyebrow inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-4 w-4" />
            Creators of Wanderly
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-on-surface md:text-5xl">
            Our Team
          </h1>
        </div>
      </section>

      {/* Plain & Simple Team Showcase Grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto md:px-margin-desktop">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="glass-widget rounded-3xl p-6 border border-outline-variant/30 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg group"
            >
              {/* Profile Photo */}
              <div className="relative mb-5 w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-primary to-primary-container shadow-md overflow-hidden shrink-0">
                <img
                  src={member.avatar}
                  alt={member.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(member.name)}`;
                  }}
                  className="w-full h-full rounded-full object-cover bg-surface"
                />
              </div>

              {/* Name & Role */}
              <h3 className="font-display text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <span className="mt-1.5 inline-block rounded-full bg-primary-container/20 px-3 py-0.5 font-body text-xs font-semibold text-primary">
                {member.role}
              </span>

              {/* Email & LinkedIn Action Buttons */}
              <div className="mt-6 w-full space-y-2 pt-4 border-t border-outline-variant/20">
                <a
                  href={`mailto:${member.email}`}
                  title={`Email ${member.name}`}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-surface-container px-3.5 py-2 font-body text-xs font-medium text-on-surface-variant transition-all hover:bg-primary hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{member.email}</span>
                </a>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title={`LinkedIn Profile for ${member.name}`}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-surface-container px-3.5 py-2 font-body text-xs font-medium text-on-surface-variant transition-all hover:bg-[#0077b5] hover:text-white"
                >
                  <svg className="h-3.5 w-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Contact;
