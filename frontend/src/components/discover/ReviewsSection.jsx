import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { FaStar } from "react-icons/fa";
import destinationsApi from "../../api/destinationApi.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Fisher-Yates shuffle — mutates array in-place.
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Compact review card for the Discover page "Our Reviews" section.
 */
function DiscoverReviewCard({ review }) {
  const initials = (review.userName || "Traveller")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase() || "T";

  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <div
      data-review-card
      className="group relative flex flex-col justify-between rounded-3xl border border-[#dec0b7]/40 bg-white/80 backdrop-blur-sm p-6 sm:p-7 shadow-[0_4px_16px_rgba(43,38,32,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(43,38,32,0.1)] hover:border-[#a23f1a]/30"
    >
      {/* Top shimmer on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-transparent via-[#a23f1a]/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        {/* Header: user info + rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a23f1a] to-[#e8734a] font-display text-sm font-bold text-white shadow-sm">
              {initials}
            </div>
            <div>
              <h4 className="font-display text-sm sm:text-base font-bold text-[#1f1b15]">
                {review.userName}
              </h4>
              <p className="font-body text-[11px] text-[#8a726a] mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">calendar_today</span>
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Star rating */}
          <div className="shrink-0 bg-[#fdf6f0] rounded-xl px-2.5 py-1.5 border border-[#dec0b7]/30">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={13}
                  className={star <= review.rating ? "text-amber-400" : "text-[#dec0b7]/40"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review text */}
        <div className="mt-4 relative">
          <span
            className="material-symbols-outlined text-2xl text-[#a23f1a]/20 absolute -top-2 -left-1 select-none pointer-events-none"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            format_quote
          </span>
          <p className="font-body text-sm text-[#1f1b15]/85 leading-relaxed pl-5 pt-1 line-clamp-4">
            {review.review}
          </p>
        </div>
      </div>

      {/* Destination tag */}
      {review.destinationName && (
        <div className="mt-4 pt-3 border-t border-[#dec0b7]/20 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-[#a23f1a]/60">location_on</span>
          <span className="font-body text-[11px] font-semibold text-[#8a726a] truncate">
            {review.destinationName}
          </span>
        </div>
      )}
    </div>
  );
}

const MAX_REVIEWS = 8;
const MAX_DESTINATIONS_TO_FETCH = 6;

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        // 1. Get all destinations
        const destinations = await destinationsApi.getAllDestinations();
        if (!destinations || destinations.length === 0) {
          setIsLoading(false);
          return;
        }

        // 2. Shuffle and pick a subset of destinations
        const shuffled = shuffle([...destinations]);
        const selected = shuffled.slice(0, MAX_DESTINATIONS_TO_FETCH);

        // 3. Fetch details (which include reviews) for each
        const detailPromises = selected.map((d) =>
          destinationsApi.getDestinationById(d.id).catch(() => null)
        );
        const details = await Promise.all(detailPromises);

        // 4. Collect all reviews and tag them with destination name
        const allReviews = [];
        for (const dest of details) {
          if (!dest || !dest.reviews) continue;
          for (const r of dest.reviews) {
            allReviews.push({
              ...r,
              destinationName: dest.name,
            });
          }
        }

        // 5. Shuffle and limit
        const finalReviews = shuffle(allReviews).slice(0, MAX_REVIEWS);
        setReviews(finalReviews);
        setTimeout(() => ScrollTrigger.refresh(), 150);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  useGSAP(
    () => {
      if (isLoading || !reviews.length || !sectionRef.current) return;

      let split;
      if (titleRef.current) {
        split = new SplitText(titleRef.current, { type: "words, chars" });
      }

      // Entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Title SplitText entrance
      if (split && split.chars && split.chars.length > 0) {
        tl.fromTo(
          split.chars,
          { opacity: 0, y: 45, rotateX: -60, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            stagger: 0.025,
            duration: 0.9,
            ease: "back.out(1.4)",
          }
        );
      } else if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
        );
      }

      // 2. Subtitle entrance
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        );
      }

      // 3. Review cards — staggered entrance via ScrollTrigger.batch
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-review-card]");
        if (cards.length > 0) {
          gsap.set(cards, { opacity: 0, y: 50, scale: 0.94 });

          ScrollTrigger.batch(cards, {
            start: "top 90%",
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.1,
              });
            },
            once: true,
          });
        }
      }

      return () => {
        if (split) split.revert();
        tl.kill();
      };
    },
    {
      dependencies: [reviews, isLoading],
      scope: sectionRef,
    }
  );

  // Don't render if no reviews
  if (isLoading || reviews.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-margin-desktop py-16 sm:py-20 md:py-28 overflow-hidden bg-[#fff8f4]"
    >
      {/* Decorative ambient orbs */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#ffdbd0]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-[#e8cfc0]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-60 h-60 bg-[#c2e8bc]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-container-max mx-auto text-center mb-12 sm:mb-16 relative z-10">
        <span className="font-body text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#a23f1a] mb-3 block">
          What Travelers Say
        </span>
        <h2
          ref={titleRef}
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1f1b15] tracking-tight leading-[1.15]"
        >
          Our Reviews
        </h2>
        <p
          ref={subtitleRef}
          className="font-body text-sm sm:text-base md:text-lg text-[#57423b]/70 mt-4 max-w-2xl mx-auto leading-relaxed"
        >
          Real stories from real explorers — discover what fellow travelers loved about their journeys.
        </p>
      </div>

      {/* Reviews Grid */}
      <div
        ref={gridRef}
        className="max-w-container-max mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 relative z-10"
      >
        {reviews.map((review, idx) => (
          <DiscoverReviewCard key={`${review.id}-${review.destinationName}-${idx}`} review={review} />
        ))}
      </div>
    </section>
  );
}
