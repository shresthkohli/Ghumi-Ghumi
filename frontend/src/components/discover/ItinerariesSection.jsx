import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

function ItinerariesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const cardWindowRef = useRef(null);
  const scheduleItemsRef = useRef(null);
  const trailSvgRef = useRef(null);
  const trailPathRef = useRef(null);

  useGSAP(
    () => {
      let split;
      if (titleRef.current) {
        split = new SplitText(titleRef.current, { type: "words, chars" });
      }

      // Entrance timeline triggered on scroll when section enters view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // 0. Serpentine Dashed Journey Trail scroll entrance (draws from top to bottom)
      let flowTween;
      if (trailSvgRef.current && trailPathRef.current) {
        tl.fromTo(
          trailSvgRef.current,
          { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 0.85,
            duration: 1.4,
            ease: "power2.inOut",
          },
          0
        );

        // Infinite continuous downward flow of dashes
        flowTween = gsap.to(trailPathRef.current, {
          strokeDashoffset: -170,
          duration: 3.2,
          repeat: -1,
          ease: "none",
        });
      }

      // 1. Heading SplitText animation
      if (split && split.chars && split.chars.length > 0) {
        tl.fromTo(
          split.chars,
          { opacity: 0, y: 35, rotateX: -45, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            stagger: 0.02,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.9"
        );
      } else if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
          "-=0.9"
        );
      }

      // 2. Description paragraph entrance
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        );
      }

      // 3. Button entrance
      if (btnRef.current) {
        tl.fromTo(
          btnRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.4"
        );
      }

      // 4. Mock UI Card entrance (slide in & float 3D perspective)
      if (cardWindowRef.current) {
        tl.fromTo(
          cardWindowRef.current,
          { opacity: 0, x: 60, y: 35, rotateY: -10, rotateX: 6, scale: 0.94 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            onComplete: () => {
              // Smooth idle float physics
              gsap.to(cardWindowRef.current, {
                y: -8,
                rotateY: 1.5,
                rotateX: -1.5,
                duration: 3.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
          },
          "-=0.7"
        );
      }

      // 5. Schedule Items inside card stagger entrance
      if (scheduleItemsRef.current) {
        const items = scheduleItemsRef.current.children;
        tl.fromTo(
          items,
          { opacity: 0, y: 20, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }

      return () => {
        if (split) split.revert();
        if (flowTween) flowTween.kill();
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  // Interactive 3D tilt control on mouse move
  const handleMouseMove = (e) => {
    if (!cardWindowRef.current) return;
    const rect = cardWindowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(cardWindowRef.current, {
      rotateY: (x / rect.width) * 10,
      rotateX: (-y / rect.height) * 10,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardWindowRef.current) return;
    gsap.to(cardWindowRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-margin-desktop py-16 sm:py-20 md:py-28 overflow-hidden bg-[#fff8f4] text-[#1f1b15]"
      style={{ perspective: "1200px" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Typography & Action */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          <h2
            ref={titleRef}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1f1b15] leading-[1.15] tracking-tight"
          >
            Your Journey,<br />
            Masterfully Crafted.
          </h2>

          <p
            ref={descRef}
            className="font-body text-sm sm:text-base md:text-lg text-[#57423b] max-w-lg leading-relaxed font-normal"
          >
            Build complex itineraries with smart route optimization and curated expert suggestions. Our intuitive builder lets you visualize your entire trip, from bespoke dining to private transfers.
          </p>

          <div className="pt-2 sm:pt-4">
            <Link
              to="/itineraries"
              ref={btnRef}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#a23f1a] hover:bg-[#e8734a] text-white font-body text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_25px_rgba(162,63,26,0.2)] cursor-pointer"
            >
              Start Building
            </Link>
          </div>
        </div>

        {/* Right Column: Mock UI Card with Dashed Journey Trail */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
          {/* Winding serpentine dashed travel path with top-to-bottom reveal & continuous downward flow */}
          <svg
            ref={trailSvgRef}
            className="hidden sm:block absolute -left-6 sm:-left-10 -top-10 -bottom-10 h-[120%] w-24 pointer-events-none z-0 overflow-visible select-none"
            viewBox="0 0 100 600"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              ref={trailPathRef}
              d="M 55 0 C 15 80, 85 160, 50 240 C 15 320, 82 400, 48 480 C 18 540, 72 575, 48 620"
              stroke="#d29d8d"
              strokeWidth="4.5"
              strokeDasharray="9 8"
              strokeLinecap="round"
            />
          </svg>

          <div
            ref={cardWindowRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-xl rounded-3xl sm:rounded-[32px] bg-white border border-[#dec0b7]/60 p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(43,38,32,0.08)] transition-all duration-300 hover:border-[#dec0b7] hover:shadow-[0_25px_60px_rgba(43,38,32,0.12)] relative z-10"
          >
            {/* Header section inside card */}
            <div className="flex items-start justify-between mb-6 pb-3 border-b border-[#dec0b7]/30">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#8a726a] font-body block mb-1">
                  GOA
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1f1b15]">
                  Day 01 | Arrival in Goa
                </h3>
              </div>

              {/* Window control dots */}
              <div className="flex items-center gap-2 pt-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dec0b7]/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#dec0b7]/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#dec0b7]/60" />
              </div>
            </div>

            {/* Schedule Items Stack */}
            <div ref={scheduleItemsRef} className="space-y-4">
              {/* Item 1: Transport */}
              <div className="flex items-center gap-4 sm:gap-5 p-3.5 sm:p-4 rounded-2xl bg-[#fcf2e8] border border-[#dec0b7]/40 hover:border-[#dec0b7] hover:bg-[#f7ece2] transition-all duration-300 group cursor-pointer">
                <img
                  src="/zurich-transfer.png"
                  alt="Private Transfer to Goa Resort"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#d0eac4] text-[#4e6447] text-[10px] font-bold tracking-wider uppercase font-body">
                      TRANSPORT
                    </span>
                    <span className="text-xs text-[#8a726a] font-medium font-body">
                      10:00 AM
                    </span>
                  </div>
                  <h4 className="font-body font-semibold text-[#1f1b15] text-sm sm:text-base mt-2 truncate group-hover:text-[#a23f1a] transition-colors">
                    Private Transfer to Taj Exotica, Goa
                  </h4>
                </div>
              </div>

              {/* Item 2: Dining */}
              <div className="flex items-center gap-4 sm:gap-5 p-3.5 sm:p-4 rounded-2xl bg-[#fcf2e8] border border-[#dec0b7]/40 hover:border-[#dec0b7] hover:bg-[#f7ece2] transition-all duration-300 group cursor-pointer">
                <img
                  src="/kronenhalle-dining.png"
                  alt="Sunset Dinner at Baga Beach"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbd0] text-[#a23f1a] text-[10px] font-bold tracking-wider uppercase font-body">
                      DINING
                    </span>
                    <span className="text-xs text-[#8a726a] font-medium font-body">
                      06:30 PM
                    </span>
                  </div>
                  <h4 className="font-body font-semibold text-[#1f1b15] text-sm sm:text-base mt-2 truncate group-hover:text-[#a23f1a] transition-colors">
                    Sunset Dinner at Baga Beach
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItinerariesSection;
