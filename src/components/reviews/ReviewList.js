import React, { useEffect, useContext, useState } from "react"
import { Review } from "./Review"
// import "./Review.css"
// import the context object you created in the provider component so that the Context hook can access the objects it exposes.
import { ReviewContext } from "./ReviewProvider"
import { useHistory } from "react-router-dom";



export const ReviewList = () => {
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))

/* useContext hook allows you to use data structures and functions that a parent 
provider component exposes.
*/

// child components of ReviewContext.Provider { reviews, getReviews, searchTerms }

/* useContext() - Used by UI components that need data stored in the context, and 
exposed by the provider component. */

// This state changes when `getReviews()` is invoked below

    const { reviews, getReviews, searchTerms } = useContext(ReviewContext)

// filteredReviews is the current state and setFilter is the function that allows you to update the state. 
// useState([]) is the default value
// everytime the state is updated the component will re-render
    const [ filteredReviews, setFiltered ] = useState([])

// The useHistory hook gives you access to the history instance that is used to navigate.
    const history = useHistory()


    // listOfReviews is === to the entire list of Reviews
    const listOfReviews = filteredReviews.filter(review => currentUserId === review.userId)

// useEffects runs once after intial render and does not run again
/*
useEffect component reaches out to the API call for the reviews because it was 
not handled during render.

useEffect is a Hook that allows you to perform side-effects in functional components. 
These effects are only executed after the component has rendered, therefore not blocking the render itself. 
*/

// gets data
    useEffect(() => {
        getReviews()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching reviews
            // filters through reviews to find review name typed in search bar            
            const subset = reviews.filter(review => review.food.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all reviews
            setFiltered(reviews)
        }
        }, [searchTerms, reviews])

    return (
    <>
    <section>
        <h2 className="food__reviewsTitle">My Reviews</h2>
{/* when New Review button is clicked users are rerouted to http://localhost:3000/reviews/create  */}

        <button onClick={() => { history.push("/reviews/create") }}>New Review</button>

        <div className="reviews">
        {
        /* .map() array method to iterate the array of reviews and generate HTML for 
        each one by invoking the Review component function.
        
        pullung in list of reviews to map through and returning a object*/ 
            listOfReviews.map(reviewObj => {
                console.table(reviewObj)
        // "key" and "review" are properties on an object that gets passed as an argument
        // key={reviewObj.id} === is equal to each individual review, is looking for the id of each review.
        // review={reviewObj} === is re-naming one individual review object from listOfReviews 
        // this return is passing in the Review.js componet. 
            return <Review key={reviewObj.id} review={reviewObj} />
        })
        }
        </div>
    </section>
    </>
)
}

