function Footer() {
  const links = [
    "About Us",
    "Sustainability",
    "Privacy Policy",
    "Terms of Service",
    "Contact",
  ];

  return (
    <footer className="bg-surface-container-high px-6 py-12 md:px-margin-desktop">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
        <div>
          <span className="font-display text-2xl font-bold text-primary">
            Wanderly
          </span>
          <p className="mt-2 max-w-xs font-body text-sm text-on-surface-variant">
            The Discerning Explorer's Companion. Crafting unforgettable
            narratives worldwide.
          </p>
        </div>

        <div className="flex flex-wrap gap-gutter">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-sm text-on-surface-variant"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <p className="mt-10 text-center font-body text-xs text-on-surface-variant">
        © 2026 Wanderly. All rights reserved.
      </p>
    </footer>
  );
}
export default Footer