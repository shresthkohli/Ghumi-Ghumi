import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function ProfileHeader({ user }) {

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
                                    className="h-28 w-28 rounded-full object-cover border-4 border-primary-container"
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

                    <Link
                        to="/settings"
                        className="
                            rounded-full
                            bg-primary
                            px-6
                            py-3
                            text-on-primary
                            font-medium
                            transition-colors
                            hover:bg-primary/90
                        "
                    >

                        Edit Profile

                    </Link>

                </div>

            </div>

        </section>

    );

}

export default ProfileHeader;