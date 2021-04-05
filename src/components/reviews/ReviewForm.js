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
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))

/*
useContext() - is a way to pass data through the component tree w/o havin to pass down 
manually at every level.
useContext() - lets you subscribe to React context without introducing nesting.
useContext() - Used by UI components that need data stored in the context, and 
exposed by the provider component.
*/
    const { addReview, getReviewById, updateReview, getReviews } = useContext(ReviewContext)


    const { foods, getFoods } = useContext(FoodContext)
    console.log(foods)

/*useState hook takes the initial value of our state as the only argument, and it
returns an array of two elements. The first element is our state variable and
the second element is a function in which we can use the update the value
of the state variable.

review is the state variable 
setReview is a function which we can use to update the value of review.
Every time state is updated, the component will re-render
*/

/*
const [review, setReview] = useState({})

this is declaring review as a vairable and setReview as a function that sets the state 
of the variable and invokes it

/*useState hook takes the initial value of our state as the only argument, and it
returns an array of two elements. The first element is our state variable and
the second element is a function in which we can use the update the value
of the state variable.

review is the state variable 
setReview is a function which we can use to update the value of food.
Every time state is updated, the component will re-render

useState to hold and set the array of reviews.
const reviews  = []
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

// Reach out to the world and get reviews state on initialization
useEffect(() => {
    getReviews()
}, [])

//when field changes, update state. This causes a re-render and updates the review.
//Controlled component
const handleControlledInputChange = (event) => {
    console.log(event.target)
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.
        
        Spread syntax (...) allows an iterable such as an array expression or string to be expanded in 
        places where zero or more arguments (for function calls) or elements (for array literals) are 
        expected, or an object expression to be expanded in places where zero or more key-value pairs
        (for object literals) are expected.

        Spread syntax can be used when all elements from an object or array meeds to be included in a list of some kind

        ... = function passes all the values in the array
        review =  is the array name
        */
    
    const newReview = { ...review }


    const dateRep = new Date()
console.log("value :" , event.target.value, "id :" , event.target.name)
/* Review is an object with properties. Set the property to the new value using 
object bracket notation. */


    //review is an object with properties.
    //set the property to the new value

    // this tells the button to grab the id of the new review that has been created
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

/* This is how we check for whether the form is being used for editing or creating. 
If the URL that got us here has an id number in it, we know we want to update an 
existing record of an review. 
*/
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

// Get review. If reviewId is in the URL, getReviewById
useEffect(() => {
    // refactor and take out getReviews
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
{/* this is the star rating */}
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
        <label htmlFor="food">Assign to Food: </label>
        <select value={review.foodId} id="foodId" className="form-control" onChange={handleControlledInputChange}>
            <option value="0">Select a food</option>
            {foods.filter(food => currentUserId === food.userId).map(food => (
            <option key={food.id} value={food.id}>
                {food.name}
            </option>
            ))}
        </select>
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
        <label htmlFor="reviewText">Review text: </label>
        <input type="text" id="text" required autoFocus className="form-control"
        placeholder="Review Text"
        onChange={handleControlledInputChange}
        value={review.text}
        />
        </div>
    </fieldset>

    {/* <fieldset>
        <div className="food__timeStamp">
            <label htmlFor="timestamp">Timestamp:</label>
            <input type="datetime" id="timestamp" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Timestamp" value={review.timestamp}/>
        </div>
    </fieldset> */}
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



