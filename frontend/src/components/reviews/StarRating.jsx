import {FaStar} from "react-icons/fa";

export default function StarRating({
    rating=0,
     onChange,
     size=30,
     readOnly=false
}) {
    return (
        <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((star) => {
                const filled = star <= rating;
                return(
                    <button
                        key={star}
                        type="button"
                        disabled={readOnly}
                        onClick={() => { if (readOnly) return ;
                            if(star === rating)
                            {
                                onChange(rating-1);
                            }
                            else {
                                onChange(star);
                            }
                        }}
                        className={`transition-all duration-200 ${!readOnly ? "cursor-pointer hover:scale-125" : "cursor-default"}`}
                    >
                        <FaStar
                            size={size}
                            className={ filled ? "gold-accent " : "text-outline-variant"}
                        />
                    </button>
                )
            })}
        </div>
    );
}