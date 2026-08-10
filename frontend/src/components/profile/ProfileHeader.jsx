import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout as apiLogout } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext.jsx";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function ProfileHeader({ user }) {
    const navigate = useNavigate();
    const { logout: authLogout } = useAuth();
    const [loggingOut, setLoggingOut] = useState(false);

    if (!user) return null;

    const {
        name,
        email,
        avatarUrl,
        createdAt,
    } = user;

    const initials = name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const memberSince = new Date(createdAt).toLocaleDateString(
        "en-IN",
        {
            month: "long",
            year: "numeric",
        }
    );

    async function handleLogout() {
        if (loggingOut) return;

        try {
            setLoggingOut(true);
            const response = await apiLogout();
            authLogout();

            if (response?.success) {
                navigate("/", {
                    replace: true,
                });
            } else {
                console.error("Logout failed:", response?.error);
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error("Logout request failed:", error);
            authLogout();
            navigate("/", { replace: true });
        } finally {
            setLoggingOut(false);
        }
    }

    return (
        <section className="rounded-[2.5rem] bg-surface-container border border-outline/20 p-8 shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                {/* Left: Avatar + Details */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    {avatarUrl ? (
                        <img
                            src={`${API_URL}${avatarUrl}`}
                            alt={name}
                            className="
                                h-28
                                w-28
                                rounded-full
                                object-cover
                                border-4
                                border-primary-container
                                shadow-md
                                transition-transform
                                duration-300
                                hover:scale-105
                            "
                        />
                    ) : (
                        <div
                            className="
                                h-28
                                w-28
                                rounded-full
                                bg-primary-container
                                text-primary
                                flex
                                items-center
                                justify-center
                                font-display
                                text-4xl
                                shadow-md
                                transition-transform
                                duration-300
                                hover:scale-105
                            "
                        >
                            {initials}
                        </div>
                    )}

                    <div>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-on-surface">
                            {name}
                        </h1>

                        <p className="mt-2 font-body text-base text-on-surface-variant">
                            {email}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <span
                                className="
                                    rounded-full
                                    bg-primary-container/15
                                    border
                                    border-primary-container/30
                                    px-4
                                    py-1.5
                                    text-sm
                                    font-medium
                                    text-primary
                                "
                            >
                                Member since {memberSince}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Logout Button */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="
                            rounded-full
                            bg-primary
                            px-7
                            py-3
                            text-on-primary
                            font-medium
                            shadow-md
                            transition-all
                            duration-200
                            hover:bg-primary/90
                            hover:-translate-y-0.5
                            hover:shadow-lg
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                            disabled:hover:translate-y-0
                            active:scale-95
                        "
                    >
                        {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProfileHeader;