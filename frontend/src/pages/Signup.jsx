import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import DarkMode from "../components/DarkMode.jsx";
import { signup, googleLogin } from "../api/authApi.js";
import Toast from "../components/Toast.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { GoogleLogin } from "@react-oauth/google";


function Signup({ darkMode, setdarkMode }) {

    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const navigate = useNavigate();

    const { login: setLoggedInUser } = useAuth();

    async function handleSubmit(e) {

        e.preventDefault();
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await signup({
                name,
                email,
                password
            });
            setLoggedInUser(response.data);
            navigate("/");
            console.log(response);
        }
        catch (error) {
            console.error(error);
            setError(error.message || "Something wenyt wrong. Please try again.")
        }
        finally {
            setLoading(false)
        }
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
        <DarkMode darkMode={darkMode} setdarkMode={setdarkMode} />
        <Toast message={error} onClose={() => setError("")} />
        <div className={`flex justify-center items-center h-screen ${darkMode
            ? "bg-gray-900 text-white"
            : "bg-surface-container-high text-black"
            }`}>
            <form
                onSubmit={handleSubmit}
                className={`p-10 rounded-lg ${darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                    }`}>

                <h1 className={`text-4xl text-center font-bold mb-6 ${darkMode ? "text-white" : "text-on-surface-variant"}`}>Signup</h1>

                <input type="text" value={name} placeholder="Enter your Name"
                    className={`mb-6 border-2  border-on-surface rounded px-11 ${darkMode ?
                        "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600"}`} onChange={(e) => setName(e.target.value)}
                /><br></br>

                <input type="email" value={email} placeholder="Enter your email"
                    className={`mb-6 border-2  border-on-surface rounded px-11 ${darkMode ?
                        "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600"}`} onChange={(e) => setemail(e.target.value)}></input><br></br>

                <input type="password" value={password} placeholder="Create a password"
                    className={`mb-6 border-2  border-on-surface rounded px-11 ${darkMode ?
                        "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600"}`} onChange={(e) => setpassword(e.target.value)}></input> <br></br>

                <input type="password" value={confirmPassword} placeholder="Confirm the new password"
                    className={`mb-6 border-2  border-on-surface rounded px-11 ${darkMode ?
                        "text-white placeholder:text-gray-400" : "text-black placeholder:text-gray-600 placeholder:text-right"}`} onChange={(e) => setconfirmPassword(e.target.value)}></input> <br></br>

                <button
                    type="submit"
                    disabled={loading}
                    className=" text-white px-24 my-4 py-2 text-2xl font-bold bg-gradient-to-r from-primary-container to-primary
                hover:from-primary hover:to-primary-container hover:scale-105 transition duration-600">
                    {loading ? "Creating account..." : "Signup"}
                </button>

                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        console.log("Google Login Failed");
                    }}
                />

                <h3 className={` font-semibold ml-5 pt-5 ${darkMode ? "text-white" : "text-black"}`}>Already have an account?
                    <Link to="/" className={`font-semibold text-md ml-1
         hover:font-bold hover:underline ${darkMode ? "text-fuchsia-300" : "text-on-surface-variant"}`}>
                        Login</Link></h3>
            </form>
        </div>
    </>
    );
}
export default Signup