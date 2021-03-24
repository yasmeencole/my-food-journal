import React, { useContext, useEffect, useState } from "react"
import { FoodContext } from "../foods/FoodProvider"
import { ReviewContext } from "./ReviewProvider"
import { useHistory, useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";


const structureOfDate = {
    hour: '2-digit',
    minute: '2-digit',
    year: "numeric",
    month: "numeric",
    day: "numeric"
}

export const ReviewForm = () => {
    const { addReview, getReviewById, updateReview } = useContext(ReviewContext)
    const { getReviews } = useContext(ReviewContext)


    const { foods, getFoods } = useContext(FoodContext)
    console.log(foods)
    // const { customers, getCustomers } = useContext(CustomerContext)
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [review, setReview] = useState({
        id: "",
        userId: parseInt(sessionStorage.getItem("app_user_id")),
        foodId: 0,
        rating: 0,
        text: "",
        timestamp: ""
    });

    //wait for data before button is active. Look at the button to see how it's setting itself to disabled or not based on this state
const [isLoading, setIsLoading] = useState(true);
const { reviewId } = useParams();
const history = useHistory();

useEffect(() => {
    getReviews()
}, [])

//when field changes, update state. This causes a re-render and updates the view.
//Controlled component
const handleControlledInputChange = (event) => {
    console.log(event.target)
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newReview = { ...review }
    const dateRep = new Date()

    //animal is an object with properties.
    //set the property to the new value
    newReview[event.target.id] = event.target.value
    newReview.timestamp = `${dateRep.toLocaleDateString('en-US', structureOfDate)}`
    //update state
    setReview(newReview)
}

const handleSaveReview = () => {

    if (parseInt(review.foodId) === 0) {
        window.alert("Please select a food")
    } else {
    //disable the button - no extra clicks
    setIsLoading(true);

    // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of an animal
    if (reviewId){
        //PUT - update
        updateReview({
            id: review.id,
            userId: parseInt(review.userId),
            foodId: parseInt(review.foodId),
            rating: review.rating,
            text: review.text,
            timestamp: review.timestamp
        })

        .then(() => history.push(`/reviews/detail/${review.id}`))
    }else {
        //POST - add
        addReview({
            id: review.id,
            userId: parseInt(review.userId),
            foodId: parseInt(review.foodId),
            rating: review.rating,
            text: review.text,
            timestamp: review.timestamp
        })

        .then(() => history.push("/reviews"))
    }
    }
}

// Get locations. If employeeId is in the URL, getEmployeeById
useEffect(() => {
    getReviews().then(getFoods).then(() => {
    if (reviewId) {
        getReviewById(reviewId)
        .then(review => {
            setReview(review)
            setIsLoading(false)
        })
    } else {
        setIsLoading(false)
    }
    })
}, [])

const ratingChanged = (newRating) => {

const newReview = { ...review }
newReview.rating = newRating

setReview(newReview);

};

return (
    <form className="reviewForm">
    <h2 className="reviewForm__title">{reviewId ? "Edit Review" : "Add Review"}</h2>
<fieldset>

    <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />        
</fieldset>
    <fieldset>
        <div className="form-group">
        <label htmlFor="reviewText">Review text: </label>
        <input type="text" id="text" required autoFocus className="form-control"
        placeholder="Review Text"
        onChange={handleControlledInputChange}
        value={review.text}/>
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
        <label htmlFor="food">Assign to Food: </label>
        <select value={review.foodId} id="foodId" className="form-control" onChange={handleControlledInputChange}>
            <option value="0">Select a food</option>
            {foods.map(food => (
            <option key={food.id} value={food.id}>
                {food.name}
            </option>
            ))}
        </select>
        </div>
    </fieldset>
    <fieldset>
        <div className="food__timeStamp">
            <label htmlFor="timestamp">Timestamp:</label>
            <input type="datetime" id="timestamp" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Timestamp" value={review.timestamp}/>
        </div>
    </fieldset>
    <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
        handleSaveReview()
        }}>
    {reviewId ? "Save Review" : "Add Review"}</button>
    </form>
)
}



