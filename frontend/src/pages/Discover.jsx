import {useEffect, useState,useRef } from "react";
import {MapPin , Calendar} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FeaturedJourney from "../components/FeaturedJourneys";
import Footer from "../components/Footer.jsx"
import destinationsApi from "../api/destinationApi.js";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL ?? "";

const warmShadow = "0 24px 48px -12px rgba(43, 38, 32, 0.15)";

function Discover()
{
     const wrapRef = useRef(null);
    const heroRef = useRef(null);  
    const bgRef = useRef(null);
    const headlineRef = useRef(null);
    const eyebrowRef = useRef(null);
    const searchBarRef = useRef(null);

    useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=100%",     
          pin: heroRef.current,
          scrub: true,           
        },
      });

      tl.to(bgRef.current, { scale: 1.35, ease: "none" }, 0)
        .to(headlineRef.current, { opacity: 0, y: -60, scale: 0.9, ease: "none" }, 0)
        .to(eyebrowRef.current, { opacity: 0, ease: "none" }, 0)
        .to(searchBarRef.current,{opacity:0 , ease:"none" , y:-60} ,0);

      gsap.to(".compass-needle", {
          rotate: 180,              
          ease: "none",            
          scrollTrigger: {
            trigger: document.body, 
            start: "top top",       
            end: "bottom bottom",  
            scrub: 0.6               
          }
        });
    }, wrapRef);

        return () => ctx.revert();
        }, []);
    const [dateRange , setDateRange] = useState([null , null]);
    const [startDate , endDate] = dateRange;
    const [ladakh, setLadakh] = useState([]);

      useEffect( () => {
      async function getImage() {
        const data=await destinationsApi.getDestinationsByQuery("name=Ladakh");
        setLadakh(data[0]);
        console.log(ladakh);
        ScrollTrigger.refresh();
      }
      getImage();
      }, []);

    return(<>
    <section ref={wrapRef}>
        <div ref={heroRef} className="relative inset-0 overflow-hidden md:h-screen h-[520px]">
            <img ref={bgRef} src={`${API_URL}${ladakh?.imageUrl}`} alt="mountains" className="absolute inset-0 w-full h-full object-cover">
            </img>
    <div className="absolute inset-0 bg-black/30"></div>

    <div className="absolute inset-0"
    style={{
          background:
            "linear-gradient(to bottom, transparent 60%, var(--color-background) 95%)",
        }}
    ></div>

    <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center px-6 text-center ">
        <h1 ref={eyebrowRef} className="eyebrow text-white mb-6 text-xl font-body font-bold">THE WORLD AWAITS</h1>

      <h1 ref={headlineRef} className=" headline text-5xl font-bold font-display leading-tight text-surface md:text-6xl lg:text-7xl ">
        Curated Expeditions for <br></br>
        the Discerning Explorer
      </h1>

      <div
          className=" mt-8 flex w-full max-w-xl items-center gap-3 rounded-full bg-white/50 px-6 py-6 backdrop-blur-sm "
          style={{ boxShadow: warmShadow }}
          ref={searchBarRef}
        >
        <div className=" flex flex-1 items-center justify-center gap-2 px-3">
          <MapPin  className="text-on-surface-variant w-[60px] h-[60px] lg:w-5 lg:h-5" />
            <span className="font-body text-lg text-on-surface-variant ">
              Where to next?
            </span>
        </div>
      </div>
       <div className="absolute -bottom-5 right-5  md:bottom-5 flex items-center gap-3 pl-3 pr-4 py-2 rounded-full bg-white/25 backdrop-blur-lg backdrop-saturate-150 border border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]">
        <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b5502e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="compass-needle w-6 h-6"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        </div>
        <div>
          <div className="text-[11px] font-medium text-on-surface/65">
            Current feature
          </div>
          <div className="text-sm font-semibold text-on-surface">
            Ladakh
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
    <FeaturedJourney/>
    <Footer/>
    </>);
}
export default Discover