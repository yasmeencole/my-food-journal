import React, { useContext, useEffect, useState } from "react"
import { ReviewContext } from "./ReviewProvider"
import { useParams, useHistory } from "react-router-dom"


export const ReviewDetail = () => {
    const { getReviewById, deleteReview} = useContext(ReviewContext)

    const [review, setReviews] = useState({})
    console.log(review)      

    const {reviewId} = useParams();
    const history = useHistory();

    useEffect(() => {
        console.log("useEffect", reviewId)
        getReviewById(reviewId)
        .then((response) => {
            setReviews(response)
        })
    }, [])

    const handleRelease = () => {

        deleteReview(review.id)
        .then(() => {
            history.push("/reviews")
        })
    }

    return (
        <section className="review">
        <h3 className="review__text">{review.title}</h3>

        {/* <div className="food__url" src={food.url}>{food.url}</div> */}
        <div className="review__rating">Rating: {review.rating}</div>

        <div className="review__text">Review: {review.text}</div>

        <div className="article__timestamp">Timestamp: {review.timestamp}</div>
        <div>
        <button onClick={handleRelease}>Release food</button>
        <button onClick={() => { history.push(`/reviews/edit/${review.id}`) }}>Edit</button>
        </div>
</section>
    )
}
