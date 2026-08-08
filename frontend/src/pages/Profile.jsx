import { useEffect, useState } from "react";

import profileApi from "../api/profileApi";

import ProfileHeader from "../components/ProfileHeader";
import AchievementCard from "../components/AchievementCard";
import PassportCard from "../components/PassportCard";
import TravelProgress from "../components/TravelProgress";
import IndiaMap from "../components/IndiaMap";
import JourneyCard from "../components/JourneyCard";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadProfile() {

            try {

                const data = await profileApi.getProfile();

                setProfile(data);

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        }

        loadProfile();

    }, []);

    if (loading) {

        return (

            <main className="min-h-screen flex items-center justify-center">

                <span className="font-body text-on-surface-variant">

                    Loading profile...

                </span>

            </main>

        );

    }

    if (!profile) {

        return (

            <main className="min-h-screen flex items-center justify-center">

                <span className="font-body text-error">

                    Unable to load profile.

                </span>

            </main>

        );

    }

    const {

        user,
        stats,
        badge,
        passport,
        featuredJourneys,

    } = profile;

    console.log(profile.passport.stamps);

    return (

        <main className="min-h-screen bg-background py-section-gap">

            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-12">

                {/* Header */}

                <ProfileHeader
                    user={user}
                />

                {/* Achievement */}

                <AchievementCard
                    badge={badge}
                />

                {/* Passport + Progress */}

                <section className="grid gap-gutter lg:grid-cols-12">

                    <div className="lg:col-span-5">

                        <PassportCard
                            passport={passport}
                        />

                    </div>

                    <div className="lg:col-span-7 space-y-gutter">

                        <TravelProgress
                            stats={stats}
                        />

                        <IndiaMap
                            visitedStates={passport.stamps.map(stamp => stamp.state)}
                            visitedCount={stats.statesVisited}
                        />

                    </div>

                </section>

                {/* Featured Journeys */}

                <section>

                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <h2 className="font-display text-headline-lg text-on-surface">

                                Featured Journeys

                            </h2>

                            <p className="mt-2 font-body text-on-surface-variant">

                                Your favourite adventures.

                            </p>

                        </div>

                    </div>

                    {

                        featuredJourneys.length === 0 ?

                            (

                                <div
                                    className="
                                        rounded-[2.5rem]
                                        border-2
                                        border-dashed
                                        border-outline/20
                                        p-16
                                        text-center
                                    "
                                >

                                    <span className="material-symbols-outlined text-6xl text-primary">

                                        travel_explore

                                    </span>

                                    <h3 className="mt-6 font-display text-headline-md text-on-surface">

                                        No featured journeys yet

                                    </h3>

                                    <p className="mt-3 font-body text-on-surface-variant">

                                        Complete itineraries and they'll appear here.

                                    </p>

                                </div>

                            )

                            :

                            (

                                <div className="grid gap-gutter md:grid-cols-2 xl:grid-cols-3">

                                    {

                                        featuredJourneys.map((journey) => (

                                            <JourneyCard

                                                key={journey.id}

                                                {...journey}

                                            />

                                        ))

                                    }

                                </div>

                            )

                    }

                </section>

            </div>

        </main>

    );

}

export default Profile;