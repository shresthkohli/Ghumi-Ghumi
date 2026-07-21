import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DarkMode from "../components/DarkMode.jsx";
import { login, googleLogin } from "../api/authApi.js";
import Toast from "../components/Toast.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { GoogleLogin } from "@react-oauth/google";


function Login({ darkMode, setdarkMode }) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const navigate = useNavigate();

    const { login: setLoggedInUser } = useAuth();

    async function handleSubmit(e) {

        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await login({
                email,
                password
            });
            setLoggedInUser(response.data);
            console.log(response);
            navigate("/");
        }
        catch (error) {
            console.log(error);
            setError(error.message || "Something went wrong. Please try again.")
        }
        finally {
            setLoading(false);
        }

        console.log(email);
        console.log(password);
    }

    async function handleGoogleSuccess(
        response
    ) {

        setError("");
        setLoading(true);

        try {
            const response =
                await googleLogin(
                    response.credential
                );
            setLoggedInUser(response.data);
            console.log(response);
            navigate("/");
        }
        catch (error) {
            console.log(error);
            setError(error.message || "Something went wrong. Please try again.")
        }
        finally {
            setLoading(false);
        }

    }

    return (<>
        <DarkMode darkMode={darkMode} setdarkMode={setdarkMode}></DarkMode>
        <Toast message={error} onClose={() => setError("")} />
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
                    disabled={loading}
                    className=" text-white px-24 my-4 py-2 text-2xl font-bold bg-gradient-to-r from-primary-container to-primary
            hover:from-primary hover:to-primary-container hover:scale-105 transition duration-600" onClick={handleSubmit}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        console.log("Google Login Failed");
                    }}
                />

                <h3 className={` font-semibold ml-5 ${darkMode ? "text-white" : "text-black"}`}>Don't have an account?
                    <Link to="/signup" className={`font-semibold text-md ml-1
         hover:font-bold hover:underline ${darkMode ? "text-fuchsia-300" : "text-on-surface-variant"}`}>
                        Sign up</Link></h3>
            </form>

        </div>
    </>
    );
}
export default Login