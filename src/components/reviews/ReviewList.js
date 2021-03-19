import React, { useEffect, useContext, useState } from "react"
import { Review } from "./Review"
import "./Review.css"
import { ReviewContext } from "./ReviewProvider"
import { useHistory } from "react-router-dom";


export const ReviewList = () => {
    // This state changes when `getReviews()` is invoked below
    const { reviews, getReviews, searchTerms } = useContext(ReviewContext)

    const [ filteredReviews, setFiltered ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getReviews()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching foods
            const subset = reviews.filter(review => review.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all foods
            setFiltered(reviews)
        }
        }, [searchTerms, reviews])

    return (
    <>
    <section>
        <h2 className="review__myReviewsTitle">My Reviews</h2>
        <button onClick={() => { history.push("/reviews/create") }}>New Review</button>

        <div className="reviews">
        {
            filteredReviews.map(review => {
            return <Review key={review.id} review={review} />
        })
        }
        </div>
    </section>
    </>
)
}

