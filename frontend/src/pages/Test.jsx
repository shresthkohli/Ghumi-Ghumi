import ReviewSection from "../components/reviews/ReviewSection";

export default function Test() {

    const reviews = [
        {
            id: "1",
            userName: "Kanishtha Maheshwari",
            rating: 5,
            review:
                "Absolutely loved this destination. The scenery was breathtaking and the whole experience was unforgettable. I would definitely visit again!",
            createdAt: new Date(),
            isOwner: true
        },

        {
            id: "2",
            userName: "Rahul Sharma",
            rating: 4,
            review:
                "Beautiful place with amazing views. The journey was a little tiring but completely worth it.",
            createdAt: new Date(Date.now() - 86400000),
            isOwner: false
        },

        {
            id: "3",
            userName: "Ananya Gupta",
            rating: 5,
            review:
                "One of the best trips I have ever taken. The mountains were incredible and the locals were very welcoming.",
            createdAt: new Date(Date.now() - 2 * 86400000),
            isOwner: false
        },

        {
            id: "4",
            userName: "Arjun Mehta",
            rating: 4,
            review:
                "Really peaceful destination. Perfect if you want to get away from the usual city life.",
            createdAt: new Date(Date.now() - 5 * 86400000),
            isOwner: false
        }
    ];


    async function handleCreateReview(data) {

        console.log("Creating review:", data);

    }


    async function handleUpdateReview(id, data) {

        console.log(
            "Updating review:",
            id,
            data
        );

    }


    async function handleDeleteReview(id) {

        console.log(
            "Deleting review:",
            id
        );

    }


    return (

        <main className="min-h-screen bg-background">


            <ReviewSection

                destination={{
                    id: "ladakh-001",
                    name: "Ladakh"
                }}

                reviews={reviews}

                onCreateReview={handleCreateReview}

                onUpdateReview={handleUpdateReview}

                onDeleteReview={handleDeleteReview}

            />

        </main>

    );
}