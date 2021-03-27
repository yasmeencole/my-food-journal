import React, { useEffect, useContext, useState } from "react"
import { Review } from "./Review"
// import "./Review.css"
import { ReviewContext } from "./ReviewProvider"
import { useHistory } from "react-router-dom";



export const ReviewList = () => {
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))

    // This state changes when `getFoods()` is invoked below
    const { reviews, getReviews, searchTerms } = useContext(ReviewContext)

    const [ filteredReviews, setFiltered ] = useState([])
    const history = useHistory()


    // listOfFoods is === to the entire list of MyFoods
    const listOfReviews = filteredReviews.filter(review => currentUserId === review.userId)

// useEffects runs once after intial render and does not run again
    useEffect(() => {
        getReviews()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching foods
            const subset = reviews.filter(review => review.food.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all foods
            setFiltered(reviews)
        }
        }, [searchTerms, reviews])

    return (
    <>
    <section>
        <h2 className="food__reviewsTitle">My Reviews</h2>
        <button onClick={() => { history.push("/reviews/create") }}>New Review</button>

        <div className="reviews">
        {
            listOfReviews.map(review => {
            return <Review key={review.id} review={review} />
        })
        }
        </div>
    </section>
    </>
)
}

