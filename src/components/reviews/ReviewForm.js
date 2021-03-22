import React, { useContext, useEffect, useState } from "react"
import { FoodContext } from "../foods/FoodProvider"
import { ReviewContext } from "./ReviewProvider"
import { useHistory, useParams } from 'react-router-dom';

const structureOfDate = {
    hour: '2-digit',
    minute: '2-digit',
    year: "numeric",
    month: "numeric",
    day: "numeric"
}

export const ReviewForm = () => {
    const { addReview, getReviewById, updateReview } = useContext(ReviewContext)
    const { foods, getFoods } = useContext(FoodContext)
    // const { customers, getCustomers } = useContext(CustomerContext)
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [review, setReview] = useState({
        id: "",
        userId: "",
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
    getFoods()
}, [])

//when field changes, update state. This causes a re-render and updates the view.
//Controlled component
const handleControlledInputChange = (event) => {
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
            foodId: parseInt(review.food.name),
            rating: review.rating,
            text: review.text,
            timestamp: review.timestamp
        })

        .then(() => history.push(`/reviews/detail/${review.id}`))
    }else {
        //POST - add
        addReview({
            id: review.id,
            foodId: review.foodId,
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
    getFoods().then(getFoods).then(() => {
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

return (
    <form className="reviewForm">
    <h2 className="reviewForm__title">{reviewId ? "Edit Review" : "Add Review"}</h2>
    <fieldset>
        <div className="form-group">
        <label htmlFor="employeeName">Review text: </label>
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
                {foods.name}
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



