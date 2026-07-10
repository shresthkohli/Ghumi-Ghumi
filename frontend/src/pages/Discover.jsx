import mountain from "../assets/mountain.jpg"
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
function Discover()
{
    return(<>
    <section>
        <div className="relative inset-0 overflow-hidden h-[650px]">
            <img src={mountain} alt="mountains" className="w-full h-full object-cover ">
            </img>
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="absolute inset-0 bg-teal-500/50 mix-blend-multiply"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white "></div>
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-white mb-6 text-xl font-semibold">THE WORLD AWAITS</h1>
      <h1 className="text-6xl font-bold font-[serif] text-white lg:text-7xl lg:font-[Consolas]">
        Curated Expeditions for <br></br>
        the Discerning Explorer
      </h1>
      <nav className="flex mt-15 bg-white/50">
        <FaLocationDot className="mt-1 text-gray-600"/>
        <a href="#">Where to next?</a>
        <FaCalendarDays className="text-xl text-gray-600" />
      </nav>
      </div>
        </div>
    </section>
    </>);
}
export default Discover