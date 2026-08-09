import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import destinationApi from "../api/destinationApi";
import ReviewSection from "../components/reviews/ReviewSection";

export default function Test() {

    const { user } = useAuth();

    const [destination, setDestination] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getDestination() {

            try {

                const response =
                    await destinationApi.getDestinationsByQuery(
                        "name=ladakh"
                    );

                console.log("DESTINATION API RESPONSE:", response);

                // destinationApi already returns response.data
                const destinationData = response[0];

                setDestination(destinationData);

                const storageKey =
                    `test-reviews-${destinationData.id}`;

                const savedReviews =
                    localStorage.getItem(storageKey);

                if (savedReviews) {

                    // Use edited test data after refresh
                    setReviews(JSON.parse(savedReviews));

                } else {

                    // Temporary review for testing only
                    const testReviews = [
                        {
                            id: "test-1",
                            userName:
                                user?.name ||
                                "Kanishtha Maheshwari",
                            rating: 5,
                            review:
                                "Absolutely loved this destination. The scenery was breathtaking and the whole experience was unforgettable. I would definitely visit again!",
                            createdAt:
                                new Date().toISOString(),
                            isOwner: true
                        }
                    ];

                    setReviews(testReviews);
                }

            } catch (error) {

                console.error(
                    "Error loading destination:",
                    error
                );

            } finally {

                setLoading(false);

            }
        }

        getDestination();

    }, [user]);


    // -----------------------------
    // SAVE TEMPORARILY
    // -----------------------------

    function saveReviewsLocally(updatedReviews) {

        if (!destination) return;

        localStorage.setItem(
            `test-reviews-${destination.id}`,
            JSON.stringify(updatedReviews)
        );
    }


    // -----------------------------
    // CREATE
    // -----------------------------

    async function handleCreateReview(data) {

        const newReview = {
            id: `test-${Date.now()}`,
            userName:
                user?.name ||
                "Kanishtha Maheshwari",
            rating: data.rating,
            review: data.review,
            createdAt: new Date().toISOString(),
            isOwner: true
        };

        const updatedReviews = [
            ...reviews,
            newReview
        ];

        setReviews(updatedReviews);

        saveReviewsLocally(updatedReviews);
    }


    // -----------------------------
    // UPDATE
    // -----------------------------

    async function handleUpdateReview(id, data) {

        console.log(
            "TEST UPDATE:",
            id,
            data
        );

        const updatedReviews =
            reviews.map((review) => {

                if (review.id === id) {

                    return {
                        ...review,
                        rating: data.rating,
                        review: data.review
                    };
                }

                return review;
            });

        setReviews(updatedReviews);

        saveReviewsLocally(updatedReviews);
    }


    // -----------------------------
    // DELETE
    // -----------------------------

    async function handleDeleteReview(id) {

        const updatedReviews =
            reviews.filter(
                (review) =>
                    review.id !== id
            );

        setReviews(updatedReviews);

        saveReviewsLocally(updatedReviews);
    }


    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }


    return (

        <div className="min-h-screen bg-background py-16">

            <ReviewSection
                destination={destination}
                reviews={reviews}
                onCreateReview={handleCreateReview}
                onUpdateReview={handleUpdateReview}
                onDeleteReview={handleDeleteReview}
            />

        </div>
    );
}