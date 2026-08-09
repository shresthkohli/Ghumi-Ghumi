import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/userApi";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function ProfileHeader({ user }) {

    const navigate = useNavigate();

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

            const response = await logout();

            if (response?.success) {

                navigate("/login", {
                    replace: true,
                });

            } else {

                console.error(
                    "Logout failed:",
                    response?.error
                );

            }

        } catch (error) {

            console.error(
                "Logout request failed:",
                error
            );

        } finally {

            setLoggingOut(false);

        }
    }

    return (

        <section className="rounded-[2.5rem] bg-surface-container border border-outline/20 p-8 shadow-lg">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                {/* Left */}

                <div className="flex items-center gap-6">

                    {
                        avatarUrl ?

                            (

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
                                    "
                                />

                            )

                            :

                            (

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
                                    "
                                >

                                    {initials}

                                </div>

                            )

                    }

                    <div>

                        <h1 className="font-display text-5xl text-on-surface">

                            {name}

                        </h1>

                        <p className="mt-2 font-body text-on-surface-variant">

                            {email}

                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">

                            <span
                                className="
                                    rounded-full
                                    bg-primary-container
                                    px-4
                                    py-1.5
                                    text-sm
                                    font-medium
                                    text-on-primary-container
                                "
                            >

                                Member since {memberSince}

                            </span>

                        </div>

                    </div>

                </div>


                {/* Right */}

                <div className="flex gap-3">

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="
                            rounded-full
                            bg-primary
                            px-6
                            py-3
                            text-on-primary
                            font-medium
                            transition-all
                            duration-200
                            hover:bg-primary/90
                            hover:-translate-y-0.5
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                            disabled:hover:translate-y-0
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