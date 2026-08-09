import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

import profileApi from "../api/profileApi";

import ProfileHeader from "../components/profile/ProfileHeader";
import AchievementCard from "../components/profile/AchievementCard";
import PassportCard from "../components/profile/PassportCard";
import TravelProgress from "../components/profile/TravelProgress";
import IndiaMap from "../components/profile/IndiaMap";
import ItineraryCard from "../components/itinerary/ItineraryCard";

try {
    gsap.registerPlugin(ScrollTrigger, SplitText);
} catch (e) {
    try {
        gsap.registerPlugin(ScrollTrigger);
    } catch (err) { }
}

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const pageRef = useRef(null);
    const headerRef = useRef(null);
    const badgeRef = useRef(null);
    const passportProgressRef = useRef(null);
    const passportRef = useRef(null);
    const progressRef = useRef(null);
    const mapItinerariesRef = useRef(null);
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

    // GSAP Scroll-Triggered Staggered Animations with SplitText
    useGSAP(
        () => {
            if (loading || !profile || !pageRef.current) return;

            const splits = [];

            function createSplit(element) {
                if (!element) return null;
                try {
                    const split = new SplitText(element, { type: "words, chars" });
                    splits.push(split);
                    return split;
                } catch (e) {
                    return null;
                }
            }

            // 1. Profile Header
            if (headerRef.current) {
                const headerEl = headerRef.current;
                const nameH1 = headerEl.querySelector("h1");
                const nameSplit = createSplit(nameH1);

                const headerTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: headerEl,
                        start: "top 92%",
                        once: true,
                    },
                    defaults: { ease: "power2.out" },
                });

                headerTl.fromTo(
                    headerEl,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );

                if (nameSplit?.chars?.length > 0) {
                    headerTl.fromTo(
                        nameSplit.chars,
                        { opacity: 0, y: 12 },
                        { opacity: 1, y: 0, duration: 0.45, stagger: 0.02 },
                        "-=0.3"
                    );
                }
            }

            // 2. Achievement Badge
            if (badgeRef.current) {
                const badgeEl = badgeRef.current;
                const badgeH2 = badgeEl.querySelector("h2");
                const badgeSplit = createSplit(badgeH2);

                const badgeTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: badgeEl,
                        start: "top 88%",
                        once: true,
                    },
                    defaults: { ease: "power2.out" },
                });

                badgeTl.fromTo(
                    badgeEl,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );

                if (badgeSplit?.chars?.length > 0) {
                    badgeTl.fromTo(
                        badgeSplit.chars,
                        { opacity: 0, y: 12 },
                        { opacity: 1, y: 0, duration: 0.45, stagger: 0.02 },
                        "-=0.3"
                    );
                }
            }

            // 3. Passport & Travel Progress Section
            if (passportProgressRef.current) {
                const sectionEl = passportProgressRef.current;
                const passportCard = passportRef.current;
                const progressCard = progressRef.current;
                const statCards = progressCard?.querySelectorAll(".group");
                const progH2 = progressCard?.querySelector("h2");
                const progSplit = createSplit(progH2);

                const s3Tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 85%",
                        once: true,
                    },
                    defaults: { ease: "power2.out" },
                });

                // Smooth cards reveal
                const cards = [passportCard, progressCard].filter(Boolean);
                if (cards.length > 0) {
                    s3Tl.fromTo(
                        cards,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }
                    );
                }

                // SplitText on Progress title
                if (progSplit?.chars?.length > 0) {
                    s3Tl.fromTo(
                        progSplit.chars,
                        { opacity: 0, y: 10 },
                        { opacity: 1, y: 0, duration: 0.4, stagger: 0.015 },
                        "-=0.35"
                    );
                }

                // Subtle stagger on stat cards
                if (statCards && statCards.length > 0) {
                    s3Tl.fromTo(
                        statCards,
                        { opacity: 0, y: 12 },
                        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 },
                        "-=0.35"
                    );
                }
            }

            // 4. India Map & Featured Itineraries Section
            if (mapItinerariesRef.current) {
                const sectionEl = mapItinerariesRef.current;
                const mapCard = mapRef.current;
                const itinerariesCard = itinerariesRef.current;
                const itinCards = itinerariesCard?.querySelectorAll(".glass-widget, [data-empty-itinerary]");
                const mapH2 = mapCard?.querySelector("h2");
                const mapSplit = createSplit(mapH2);
                const itinH2 = itinerariesCard?.querySelector("h2");
                const itinSplit = createSplit(itinH2);

                const s4Tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 85%",
                        once: true,
                    },
                    defaults: { ease: "power2.out" },
                });

                // Smooth cards reveal
                const cards = [mapCard, itinerariesCard].filter(Boolean);
                if (cards.length > 0) {
                    s4Tl.fromTo(
                        cards,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }
                    );
                }

                // SplitText on Map & Itineraries headings
                const headingChars = [
                    ...(mapSplit?.chars || []),
                    ...(itinSplit?.chars || []),
                ];
                if (headingChars.length > 0) {
                    s4Tl.fromTo(
                        headingChars,
                        { opacity: 0, y: 10 },
                        { opacity: 1, y: 0, duration: 0.4, stagger: 0.015 },
                        "-=0.35"
                    );
                }

                // Subtle stagger on itinerary cards
                if (itinCards && itinCards.length > 0) {
                    s4Tl.fromTo(
                        itinCards,
                        { opacity: 0, y: 15 },
                        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
                        "-=0.35"
                    );
                }
            }

            // Refresh ScrollTrigger to recalculate exact offsets
            ScrollTrigger.refresh();

            return () => {
                splits.forEach((s) => s?.revert && s.revert());
            };
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
                <section ref={passportProgressRef} className="grid gap-gutter lg:grid-cols-12 items-start">
                    {/* Digital Passport */}
                    <div ref={passportRef} className="lg:col-span-5">
                        <PassportCard passport={passport} />
                    </div>

                    {/* Progress Stats */}
                    <div ref={progressRef} className="lg:col-span-7">
                        <TravelProgress stats={stats} />
                    </div>
                </section>

                {/* 4. India Map on Left & Featured Itineraries on Right */}
                <section ref={mapItinerariesRef} className="grid gap-gutter lg:grid-cols-12 items-start">
                    {/* Big India Exploration Map on Left */}
                    <div ref={mapRef} className="lg:col-span-7 h-full">
                        <IndiaMap
                            visitedStates={visitedStates}
                            visitedCount={stats?.statesVisited || 0}
                        />
                    </div>

                    {/* User Made / Featured Itineraries on Right */}
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
                                data-empty-itinerary
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
                                        onDelete={() => { }}
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