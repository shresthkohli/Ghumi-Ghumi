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
            console.error(error);
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
            console.error(error);
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
                className="w-full max-w-md rounded-3xl border border-primary/10 bg-white p-5 sm:p-7 md:p-9 shadow-warm-lg transition-all duration-300"
            >
                <div className="mb-6 sm:mb-7 text-center">
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">
                        Login
                    </h1>
                    <p className="mt-1.5 sm:mt-2 text-sm text-on-surface-variant">
                        Login to your account
                    </p>
                </div>

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-on-surface">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface placeholder:text-on-surface-variant outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                <div className="mb-5">
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-semibold text-on-surface">
                            Password
                        </label>
                        <button
                            type="button"
                            className="text-xs font-semibold text-primary transition-all duration-200 hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface placeholder:text-on-surface-variant outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-primary-container to-primary px-6 py-3 text-base font-bold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-outline-variant" />
                    <span className="text-xs font-medium text-on-surface-variant">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-outline-variant" />
                </div>

                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            console.log("Google Login Failed");
                            setError("Google Login Failed. Please try again.");
                        }}
                    />
                </div>

                <p className="mt-6 text-center text-sm text-on-surface-variant">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="ml-1 font-semibold text-primary transition-all duration-200 hover:underline"
                    >
                        Signup
                    </Link>
                </p>
            </form>
        </>
    );
}