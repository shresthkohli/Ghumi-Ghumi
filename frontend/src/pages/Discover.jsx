import {useState } from "react";
import {MapPin , Calendar} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const warmShadow = "0 24px 48px -12px rgba(43, 38, 32, 0.15)";
import FeaturedJourney from "../components/FeaturedJourneys";
import Footer from "../components/Footer.jsx"

function Discover()
{
  const [dateRange , setDateRange] = useState([null , null]);
  const [startDate , endDate] = dateRange;

    return(<>
    <section>
        <div className="relative inset-0 overflow-hidden md:h-[620px] h-[520px]">
            <img src="https://images.unsplash.com/photo-1635255506105-b74adbd94026?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDEyfHxsYWRha2h8ZW58MHx8fHwxNzgzNzg3NDg2fDA&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450" alt="mountains" className="w-full h-full object-cover">
            </img>
    <div className="absolute inset-0 bg-black/30"></div>

    <div className="absolute inset-0"
    style={{
          background:
            "linear-gradient(to bottom, transparent 80%, var(--color-background) 95%)",
        }}
    ></div>

    <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center px-6 text-center ">
        <h1 className="text-white mb-6 text-xl font-body font-bold">THE WORLD AWAITS</h1>

      <h1 className="text-5xl font-bold font-display leading-tight text-surface md:text-6xl lg:text-7xl ">
        Curated Expeditions for <br></br>
        the Discerning Explorer
      </h1>

      <div
          className="mt-8 flex w-full max-w-xl items-center gap-3 rounded-full bg-white/50 px-6 py-6 backdrop-blur-sm "
          style={{ boxShadow: warmShadow }}
        >
        <div className=" ml-15 flex flex-1 items-center gap-2 px-3">
          <MapPin  className="text-on-surface-variant w-[30px] h-[30px] lg:w-5 lg:h-5" />
            <span className="font-body text-sm text-on-surface-variant ">
              Where to next?
            </span>
        </div>
        <div className=" flex flex-1 items-center gap-2 px-3">
          <Calendar className="text-on-surface-variant  w-[18px] h-[18px] lg:w-5 lg:h-5" />
            <DatePicker selectsRange startDate={startDate} endDate={endDate}
              onChange={(update) => {setDateRange(update);}}
                placeholderText="Select Dates"  className="outline-0 placeholder:font-body placeholder:text-sm placeholder:text-on-surface-variant"
            />
        </div>
      </div>
       <div className=" absolute bottom-0 right-5  md:bottom-5 flex items-center gap-3 pl-3 pr-4 py-2 rounded-full bg-white/25 backdrop-blur-lg backdrop-saturate-150 border border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]">
        <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b5502e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
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
            Pangong Lake
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