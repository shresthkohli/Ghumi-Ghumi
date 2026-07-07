import {useState} from "react";
function DarkMode({darkMode , setdarkMode})
{
    const[isOpen , setIsOpen] = useState(false);

    return(<>
    <button onClick = {() => setIsOpen(!isOpen)} 
    className = {`absolute top-2 right-5 text-3xl ${ darkMode ? "text-white" : "text-black"}`}>  ☰ </button>
    {
isOpen && (
    <div className="absolute top-0 right-0 h-screen w-64 mt-11 bg-gray-900 text-white p-6">
        <h2 className="text-2xl mb-6">Menu</h2>

        <button
            onClick={() => setdarkMode(true)}
            className={`block w-full text-left p-2 rounded ${
              darkMode ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
        >
            🌙 Dark Mode
        </button>

        <button
            onClick={() => setdarkMode(false)}
             className={`block w-full text-left p-2 rounded mt-3 ${
              !darkMode ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
        >
            ☀️ Light Mode
        </button>
    </div>
)
}
    </>);
}
export default DarkMode