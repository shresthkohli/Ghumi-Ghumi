import { useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "../components/DarkMode.jsx";
import { login } from "../api/authApi.js";


function Login({ darkMode, setdarkMode }) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await login({
                email,
                password
            });

            console.log(response);
        }

        catch (error) {
            console.log(error);
        }

        console.log(email);
        console.log(password);
    }
    return (<>
        <DarkMode darkMode={darkMode} setdarkMode={setdarkMode}></DarkMode>
        <div className={`flex justify-center items-center ${darkMode
            ? "bg-gray-900 text-white-400 h-screen"
            : "bg-surface-container-high text-black h-screen"}`}>
            <form onSubmit={handleSubmit}
                className={`p-10 rounded-lg ${darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    }`}>

                <h1 className={`text-4xl text-center font-bold mb-6 ${darkMode ? "text-white" : "text-on-surface-variant"}`} >Login</h1>

                <input type="email" value={email} placeholder="Enter your email"
                    className={`mb-6 border-2  border-on-surface rounded px-9 ${darkMode ?
                        "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600"}`} onChange={(e) => setemail(e.target.value)}></input><br></br>

                <input type="password" value={password} placeholder="Enter your password"
                    className={`mb-6 border-2  border-on-surface rounded px-9 ${darkMode ?
                        "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600"}`} onChange={(e) => setpassword(e.target.value)}></input> <br></br>

                <a href="#" className={`font-semibold text-sm ml-18
         hover:font-bold hover:underline ${darkMode ? "text-fuchsia-300" : "text-on-surface-variant"}`}>Forgot Password?</a><br></br>

                <button
                    type="submit"
                    className=" text-white px-24 my-4 py-2 text-2xl font-bold bg-gradient-to-r from-primary-container to-primary
            hover:from-primary hover:to-primary-container hover:scale-105 transition duration-600" onClick={handleSubmit}>
                    Login
                </button>

                <h3 className={` font-semibold ml-5 ${darkMode ? "text-white" : "text-black"}`}>Don't have an account?
                    <Link to="/signup" className={`font-semibold text-md ml-1
         hover:font-bold hover:underline ${darkMode ? "text-fuchsia-300" : "text-on-surface-variant"}`}>
                        Signup</Link></h3>
            </form>
        </div>
    </>
    );
}
export default Login