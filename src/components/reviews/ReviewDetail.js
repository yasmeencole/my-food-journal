import React, { useContext, useEffect, useState } from "react"
import { ReviewContext } from "./ReviewProvider"
import { useParams, useHistory } from "react-router-dom"


export const ReviewDetail = () => {

    // useContext() - Used by UI components that need data stored in the context, and exposed by the provider component.
    const { getReviewById, deleteReview} = useContext(ReviewContext)

    const [review, setReviews] = useState({})
    console.log(review)      

    /*
useParams() - returns an object of the params for the route rendered.
Params are placeholders in the URL that begin with a colon, like the `:foodId` 
param defined in the route in the route below. 

Example: <Route path="/reviews/detail/:reviewId(\d+)">
*/
    const {reviewId} = useParams();

/* The useHistory hook gives you access to the history instance that you may use to
navigate.
*/
    const history = useHistory();

    useEffect(() => {
        console.log("useEffect", reviewId)
        getReviewById(reviewId)
        .then((response) => {
            setReviews(response)
        })
    }, [])

//handles the delete button on the review details. handleRelease gets the review by id then deletes it.
    const handleRelease = () => {

        deleteReview(review.id)
        .then(() => {
            history.push("/reviews")
        })
    }

    return (
// returns a representation of review details

        <section className="review">
        <h3 className="review__text">{review.food?.name}</h3>

        {/* <div className="food__url" src={food.url}>{food.url}</div> */}
        <div className="review__rating">Rating: {review.rating}</div>

        <div className="review__text">Review: {review.text}</div>

        <div className="article__timestamp">Timestamp: {review.timestamp}</div>
        <div>
        <button onClick={handleRelease}>Release Review</button>
{/* this is the edit button, when clicked it sends a put request that updates the review */}

        <button onClick={() => { history.push(`/reviews/edit/${review.id}`) }}>Edit</button>
        </div>
</section>
    )
}
