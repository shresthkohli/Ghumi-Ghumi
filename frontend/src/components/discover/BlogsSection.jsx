import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import blogsApi from "../../api/blogsApi.js";
import BlogCard from "../blog/BlogCard.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Bento-grid size assignment — same pattern as the Blogs page.
 */
const BENTO_PATTERN = ["tall", "normal", "normal", "wide", "normal", "tall"];
const MAX_BLOGS = 4;

function getBentoSize(index) {
  return BENTO_PATTERN[index % BENTO_PATTERN.length];
}

function getBentoClasses(size) {
  switch (size) {
    case "tall":
      return "md:row-span-2";
    case "wide":
      return "md:col-span-2";
    default:
      return "";
  }
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const linkRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await blogsApi.getAllBlogs();
        setBlogs((data || []).slice(0, MAX_BLOGS));
        setTimeout(() => ScrollTrigger.refresh(), 150);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  useGSAP(
    () => {
      if (!blogs.length || isLoading || !sectionRef.current) return;

      let split;
      if (titleRef.current) {
        split = new SplitText(titleRef.current, { type: "words, chars" });
      }

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

      // 2. Link entrance
      if (linkRef.current) {
        tl.fromTo(
          linkRef.current,
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
          "-=0.6"
        );
      }

      // 3. Bento grid cards — staggered via ScrollTrigger.batch
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-animate-card]");
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
                stagger: 0.12,
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
      dependencies: [blogs, isLoading],
      scope: sectionRef,
    }
  );

  if (isLoading || blogs.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-margin-desktop py-16 sm:py-20 md:py-28 overflow-hidden relative bg-[#f7ece2]"
    >
      {/* Header */}
      <div className="max-w-container-max mx-auto mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <span className="font-body text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#a23f1a] mb-2 block">
            From the Community
          </span>
          <h2
            ref={titleRef}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1f1b15] tracking-tight leading-[1.15]"
          >
            Travel Stories
          </h2>
        </div>
        <Link
          ref={linkRef}
          to="/blogs"
          className="group inline-flex items-center gap-2 font-body text-sm sm:text-base font-semibold text-[#a23f1a] hover:text-[#e8734a] transition-colors duration-200 hover:underline underline-offset-4"
        >
          View All Stories{" "}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-[minmax(180px,auto)] relative z-10"
      >
        {blogs.map((blog, index) => {
          const size = getBentoSize(index);
          const bentoClasses = getBentoClasses(size);
          return (
            <div key={blog.id} className={bentoClasses}>
              <BlogCard
                blog={blog}
                index={index}
                size={size}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
