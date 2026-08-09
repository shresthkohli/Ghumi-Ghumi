import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { login, googleLogin } from "../../api/authApi.js";
import Toast from "../common/Toast.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function LoginCard({ onSuccess }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
            console.log("Login successful:", response);
            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch (error) {
            console.log(error);
            setError(
                error.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSuccess(googleResponse) {
        setError("");
        setLoading(true);
        try {
            const response = await googleLogin(
                googleResponse.credential
            );
            setLoggedInUser(response.data);
            console.log(
                "Google login successful:",
                response
            );
            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch (error) {
            console.log(error);
            setError(
                error.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);

        }
    }

    return (
        <>
            <Toast
                message={error}
                onClose={() => setError("")}
            />
            <form
                onSubmit={handleSubmit}
                className="p-10 rounded-2xl bg-white text-black"
            >
                <h1
                    className="text-4xl text-center font-bold mb-6 text-on-surface-variant">
                     Login
                </h1>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    required
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="mb-6 w-full border-2 border-on-surface rounded px-4 py-3 text-black placeholder:text-gray-600 outline-none focus:border-primary"
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    required
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="mb-4 w-full border-2 border-on-surface rounded px-4 py-3 text-black placeholder:text-gray-600 outline-none focus:border-primary"
                />
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="font-semibold text-sm text-on-surface-variant hover:font-bold hover:underline"
                    >
                        Forgot Password?
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white px-8 my-5 py-3 text-xl font-bold rounded bg-gradient-to-r from-primary-container to-primary hover:from-primary hover:to-primary-container
                        hover:scale-105 transition duration-300 disabled:opacity-50 disabled:hover:scale-100"
                >
                    {loading
                        ? "Logging in..." : "Login"
                    }
                </button>
                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            setError(
                                "Google Login Failed. Please try again."
                            );
                        }}
                    />
                </div>

                <h3 className="font-semibold text-center pt-5">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="font-semibold text-md ml-1 text-on-surface-variant hover:font-bold hover:underline"
                    >
                        Sign up
                    </Link>
                </h3>
            </form>
        </>
    );
}