import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import profileApi from "../api/profileApi";

import ProfileHeader from "../components/profile/ProfileHeader";
import AchievementCard from "../components/profile/AchievementCard";
import PassportCard from "../components/profile/PassportCard";
import TravelProgress from "../components/profile/TravelProgress";
import IndiaMap from "../components/profile/IndiaMap";
import ItineraryCard from "../components/itinerary/ItineraryCard";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const pageRef = useRef(null);
    const headerRef = useRef(null);
    const badgeRef = useRef(null);
    const passportRef = useRef(null);
    const progressRef = useRef(null);
    const mapRef = useRef(null);
    const itinerariesRef = useRef(null);

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await profileApi.getProfile();
                setProfile(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    // GSAP Page Entrance Stagger Animation
    useGSAP(
        () => {
            if (loading || !profile) return;

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Profile Header
            if (headerRef.current) {
                tl.fromTo(
                    headerRef.current,
                    { opacity: 0, y: 30, scale: 0.99 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.6 }
                );
            }

            // 2. Achievement Badge
            if (badgeRef.current) {
                tl.fromTo(
                    badgeRef.current,
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, duration: 0.55 },
                    "-=0.35"
                );
            }

            // 3. Passport & Travel Progress
            if (passportRef.current) {
                tl.fromTo(
                    passportRef.current,
                    { opacity: 0, x: -25 },
                    { opacity: 1, x: 0, duration: 0.65 },
                    "-=0.3"
                );
            }

            if (progressRef.current) {
                tl.fromTo(
                    progressRef.current,
                    { opacity: 0, x: 25 },
                    { opacity: 1, x: 0, duration: 0.65 },
                    "-=0.5"
                );
            }

            // 4. India Map (Left) & Featured Itineraries (Right)
            if (mapRef.current) {
                tl.fromTo(
                    mapRef.current,
                    { opacity: 0, x: -25 },
                    { opacity: 1, x: 0, duration: 0.65 },
                    "-=0.3"
                );
            }

            if (itinerariesRef.current) {
                tl.fromTo(
                    itinerariesRef.current,
                    { opacity: 0, x: 25 },
                    { opacity: 1, x: 0, duration: 0.65 },
                    "-=0.5"
                );
            }
        },
        { scope: pageRef, dependencies: [loading, profile] }
    );

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-background">
                <span className="font-body text-on-surface-variant text-lg">
                    Loading profile...
                </span>
            </main>
        );
    }

    if (!profile) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-background">
                <span className="font-body text-error text-lg">
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
        featuredJourneys = [],
    } = profile;

    const visitedStates = passport?.stamps
        ?.map((stamp) => stamp.state)
        .filter(Boolean) ?? [];

    return (
        <main ref={pageRef} className="min-h-screen bg-background py-section-gap">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-12">
                {/* 1. Profile Header */}
                <div ref={headerRef}>
                    <ProfileHeader user={user} />
                </div>

                {/* 2. Achievement Badge */}
                <div ref={badgeRef}>
                    <AchievementCard badge={badge} />
                </div>

                {/* 3. Passport (Left) + Travel Progress (Right) */}
                <section className="grid gap-gutter lg:grid-cols-12 items-start">
                    {/* Digital Passport */}
                    <div ref={passportRef} className="lg:col-span-5">
                        <PassportCard passport={passport} />
                    </div>

                    {/* Progress Stats */}
                    <div ref={progressRef} className="lg:col-span-7">
                        <TravelProgress stats={stats} />
                    </div>
                </section>

                {/* 4. India Map on Left & 2 Full Length User Made Itineraries on Right */}
                <section className="grid gap-gutter lg:grid-cols-12 items-start">
                    {/* Big India Exploration Map on Left */}
                    <div ref={mapRef} className="lg:col-span-7 h-full">
                        <IndiaMap
                            visitedStates={visitedStates}
                            visitedCount={stats?.statesVisited || 0}
                        />
                    </div>

                    {/* User Made / Featured Itineraries (2 Full Length Cards) on Right */}
                    <div ref={itinerariesRef} className="lg:col-span-5 flex flex-col space-y-6">
                        <div>
                            <h2 className="font-display text-3xl text-on-surface">
                                Featured Itineraries
                            </h2>
                            <p className="mt-1 font-body text-sm text-on-surface-variant">
                                Your favourite adventures.
                            </p>
                        </div>

                        {featuredJourneys.length === 0 ? (
                            <div
                                className="
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-[2.5rem]
                                    border-2
                                    border-dashed
                                    border-outline/20
                                    p-12
                                    text-center
                                    bg-surface-container/30
                                "
                            >
                                <span className="material-symbols-outlined text-5xl text-primary">
                                    travel_explore
                                </span>

                                <h3 className="mt-4 font-display text-xl font-bold text-on-surface">
                                    No featured itineraries yet
                                </h3>

                                <p className="mt-2 font-body text-sm text-on-surface-variant max-w-xs">
                                    Complete itineraries and they'll appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6 w-full">
                                {featuredJourneys.slice(0, 2).map((itinerary) => (
                                    <ItineraryCard
                                        key={itinerary.id}
                                        itinerary={itinerary}
                                        onDelete={() => {}}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Profile;