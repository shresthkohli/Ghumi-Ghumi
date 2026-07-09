import { Link } from "react-router-dom";
import { useState } from "react";
import DarkMode from "../components/DarkMode.jsx";
import { signup } from "../api/authApi.js";

function Signup({ darkMode, setdarkMode }) {
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match!");
            return;
        }

        try {

            const response = await signup({
                name,
                email,
                password
            });

            console.log(response);

        }
        catch (error) {

            console.error(error);

        }
    }

    return (<>
        <DarkMode darkMode={darkMode} setdarkMode={setdarkMode} />
        <div className={`flex justify-center items-center h-screen ${darkMode
                ? "bg-gray-900 text-white"
                : "bg-emerald-900 text-black"
            }`}>
            <form
                onSubmit={handleSubmit} 
                className={`p-10 rounded-lg ${darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}>

                <h1 className={`text-4xl text-center font-bold mb-6 ${darkMode ? "text-white" : "text-emerald-900"}`}>Signup</h1>

                <input type="text" value={name} placeholder="Enter your Name"
                    className={`mb-6 border-2  border-b-gray-500 rounded px-11 ${darkMode ?
                        "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600"}`} onChange={(e) => setName(e.target.value)}
                /><br></br>

                <input type="email" value={email} placeholder="Enter your email"
                    className={`mb-6 border-2  border-b-gray-500 rounded px-11 ${darkMode ?
                        "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600"}`} onChange={(e) => setemail(e.target.value)}></input><br></br>

                <input type="password" value={password} placeholder="Create a password"
                    className={`mb-6 border-2  border-b-gray-500 rounded px-11 ${darkMode ?
                        "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600"}`} onChange={(e) => setpassword(e.target.value)}></input> <br></br>

                <input type="password" value={confirmPassword} placeholder="Confirm the new password"
                    className={`mb-6 border-2  border-b-gray-500 rounded px-11 ${darkMode ?
                        "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600"}`} onChange={(e) => setconfirmPassword(e.target.value)}></input> <br></br>

                <button 
                type="submit"
                className=" text-white px-24 my-4 py-2 text-2xl font-bold bg-gradient-to-r from-green-600 to-green-900
                hover:from-emerald-900 hover:to-green-400 hover:font-extrabold transition duration-600">
                    Signup
                </button>

                <h3 className={` font-semibold ml-5 ${darkMode ? "text-white" : "text-black"}`}>Already have an account?
                    <Link to="/" className={`font-semibold text-md ml-1
         hover:font-bold hover:underline ${darkMode ? "text-fuchsia-300" : "text-emerald-900"}`}>
                        Login</Link></h3>
            </form>
        </div>
    </>
    );
}
export default Signup