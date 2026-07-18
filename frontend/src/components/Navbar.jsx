import {useState , useRef} from "react";
import {Search} from "lucide-react";
import {NavLink} from "react-router-dom";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

function Navbar()
{
  const navRef = useRef(null);
    useGSAP(
        () => {
          gsap.from(navRef.current, {
            y: -20,
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",
          });
        },
      );
    const links = [
  { name: "Discover", path: "/discover" },
  { name: "Itineraries", path: "/itineraries" },
  { name: "Destinations", path: "/destinations" },
  { name: "Guides", path: "/guides" },
];
     const [active, setActive] = useState(0);
     const[search , setSearch]=useState("");
     const[destinations,setDestinations]=useState([]);
    return(<>
   <header
      ref={navRef}
      className="flex items-center justify-between px-6 py-4 md:px-10 bg-background"
    >
      <span
        className="text-3xl font-bold font-display text-primary pr-3 -ml-2 lg:mr-0 lg:text-5xl lg:ml-6"
      >
        Wanderly
      </span>
           
           <nav className="flex items-center gap-8">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
             className={({ isActive }) =>
                `font-body text-sm lg:text-xl pb-1 ${
            isActive
                ? "text-primary border-b-2 border-primary font-bold"
                : "text-on-surface-variant"
            }`
        }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
              <div className="flex items-center gap-4 lg:mr-5">
                    <Search className="text-on-surface-variant w-[18px] h-[18px] lg:w-6 lg:h-6 " />
                    <button
                      className=" bg-primary font-body rounded-full px-2 lg:px-5 py-2 placeholder:text-sm font-semibold text-on-primary text-center"
                    >
                      Search for the trip
                    </button>
                    <div
                      className="h-9 w-9 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url(https://picsum.photos/seed/wanderly-avatar/80/80)",
                      }}
                    />
                  </div>
                </header>
    </>
    );
}
export default Navbar