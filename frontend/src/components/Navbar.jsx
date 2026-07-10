import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function Navbar()
{
    return(<>
    <nav className="bg-amber-100">
        <div className=" py-4 flex items-center justify-between gap-8 px-6 md:px-10 ">
            <h1 className="text-5xl ml-12 mt-4 font-serif text-amber-800 font-bold tracking-tighter ">Wanderly</h1>
            <ul className="flex gap-6 md:gap-8 lg:gap-12 bg-amber-50 rounded-b-lg">
                <li className="hover:font-bold">
                <NavLink to="/discover" className={({isActive}) => isActive ? 
                "text-orange-500 underline underline-offset-8 decoration-2 font-bold" : "text-black"}>
                Discover</NavLink></li>

                <li className="hover:font-bold">
                <NavLink to="/itineraries" className={({isActive}) => isActive ? 
                "text-orange-500 underline underline-offset-8 decoration-2 font-bold" : "text-black"}
                >Itineraries</NavLink></li>

                <li className="hover:font-bold">
                <NavLink to="/destinations" className={({isActive}) => isActive ? 
                "text-orange-500 underline underline-offset-8 decoration-2 font-bold" : "text-black"}>
                Destinations</NavLink></li>

                <li className="hover:font-bold">
                <NavLink to="/guides" className={({isActive}) => isActive ? 
                "text-orange-500 underline underline-offset-8 decoration-2 font-bold" : "text-black"}>
                Guides</NavLink></li>
            </ul>
            <div className="flex items-center gap-2">
        <FiSearch className="text-gray-600 text-xl"/>
        <input type="text" placeholder="Search destinations..." 
        className=" w-60 border-2 border-amber-700 rounded-2xl outline-amber-700 placeholder:text-blue-700 text-center caret"></input>
        </div>
        </div>
        </nav>
    </>
    );
}
export default Navbar