import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { signup, googleLogin } from "../api/authApi.js";
import Toast from "../components/Toast.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { GoogleLogin } from "@react-oauth/google";


function Signup() {

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
        <Toast message={error} onClose={() => setError("")} />
        <div className="min-h-screen flex items-center justify-center bg-surface-container-high px-4 py-8"
        >
            <form
                onSubmit={handleSubmit}
                className=" w-full max-w-md rounded-3xl border border-primary/10 bg-white p-7 shadow-warm-lg transition-all duration-300 sm:p-9 ">

                <div className="mb-7 text-center">
                    <h1 className="font-display text-3xl font-bold text-on-surface">
                        Signup
                    </h1>
                    <p className="mt-2 text-sm text-on-surface-variant">
                        Create your account
                    </p>
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-on-surface">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter your Name"
                        onChange={(e) => setName(e.target.value)}
                        className=" w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface placeholder:text-on-surface-variant outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 "
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-on-surface">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        className=" w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface placeholder:text-on-surface-variant outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 "
                        onChange={(e) => setemail(e.target.value)}>
                    </input>
                </div>

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-on-surface">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Create a password"
                        onChange={(e) => setpassword(e.target.value)}
                        className=" w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface placeholder:text-on-surface-variant outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 " />
                </div>

                <div className="mb-5">
                    <label className="mb-2 block text-sm font-semibold text-on-surface">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm your password"
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        className=" w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface placeholder:text-on-surface-variant outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 "
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className=" w-full rounded-xl bg-gradient-to-r from-primary-container to-primary px-6 py-3 text-base font-bold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 ">
                    {loading ? "Creating account..." : "Signup"}
                </button>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-outline-variant" />
                    <span className="text-xs font-medium text-on-surface-variant">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-outline-variant" />
                </div>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        console.log("Google Login Failed");
                    }}
                />

                <p className="mt-6 text-center text-sm text-on-surface-variant">
                    Already have an account?
                    <Link
                        to="/login"
                        className=" ml-1 font-semibold text-primary transition-all duration-200 hover:underline " >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    </>
    );
}
export default Signup