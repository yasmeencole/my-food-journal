import React, { useContext, useEffect, useState } from "react"
import { ReviewContext } from "./ReviewProvider"
import "./Review.css"
import { useParams, useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
// import ReactStars from "react-rating-stars-component";


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
    // const ratingChanged = (newRating) => {
    //     // console.log(newRating);
    // };
    return (
// returns a representation of review details

<Card className="food" style={{ width: '30rem' }}>
<Card.Body>
<Card.Title><h2 className="review__text">{review.food?.name}</h2></Card.Title>
{/* <ReactStars value={review.rating}
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
/>  */}

        {/* <div className="food__url" src={food.url}>{food.url}</div> */}
        {/* <ReactStars>
        </ReactStars> */}
        {/* <div className="review__rating">Rating: {review.rating}</div> */}
        <br />

        <div className="review__text">{review.text}</div>
        <br />

        <div className="article__timestamp">{review.timestamp}</div>
</Card.Body>
{parseInt(sessionStorage.getItem("app_user_id")) === review.userId ?

        <div>
        <Button onClick={handleRelease}>Delete</Button>
{/* this is the edit button, when clicked it sends a put request that updates the review */}

        <Button onClick={() => { history.push(`/reviews/edit/${review.id}`) }}>Edit</Button>
        </div>
            : ""}

</Card>
    )
}
