import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  const links = [
    { label: "About Us", path: "/about" },
    { label: "Sustainability", path: "/sustainability" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms of Service", path: "/terms-of-service" },
    { label: "Contact", path: "/contact" },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-content > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="bg-surface-container-high px-6 py-12 md:px-margin-desktop"
    >
      <div className="footer-content flex flex-col items-start justify-between gap-6 md:flex-row max-w-7xl mx-auto">
        <div>
          <Link to="/" className="font-display text-2xl font-bold text-primary">
            Wanderly
          </Link>
          <p className="mt-2 max-w-xs font-body text-sm text-on-surface-variant">
            The Discerning Explorer&apos;s Companion. Crafting unforgettable
            narratives worldwide.
          </p>
        </div>

        <div className="flex flex-wrap gap-gutter">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="group relative font-body text-sm text-on-surface-variant transition-colors hover:text-primary"
            >
              {link.label}
              <span className="footer-link-underline absolute left-0 -bottom-1 h-px w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8 h-px w-full bg-on-surface-variant/20 max-w-7xl mx-auto" />
      <p className="mt-8 text-center font-body text-xs text-on-surface-variant">
        © {new Date().getFullYear()} Wanderly. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;