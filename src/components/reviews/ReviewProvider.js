import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const ReviewContext = createContext()

// This component establishes what data can be used.
export const ReviewProvider = (props) => {
    const [reviews, setReviews] = useState([])

    const [ searchTerms, setSearchTerms ] = useState("")

    // useState([])  is to hold and set the array of reviews
    // useState() hook to define a variable that holds the state of the component, and a function that updates it.
    const timestampDate = (currurentDate, followingDate) => {
        /*
        Sort by month, day, year, time.
        
        Workaround to json-server's &_sort= .
        Does not sort correctly if using double-digit days.
    */
    
    if ( Date.parse(followingDate.timestamp) < Date.parse(currurentDate.timestamp) ) { return -1; }
    if ( Date.parse(followingDate.timestamp) > Date.parse(currurentDate.timestamp) ) { return 1; }
    return 0;
    } // 
    
    const getReviews = () => {
    return fetch("http://localhost:8088/reviews")
        .then(response => response.json())
        .then(data => data.sort(timestampDate))
        .then(foodsData => setReviews(foodsData))
}

const addReview = reviewsObj => {
    return fetch("http://localhost:8088/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewsObj)
    })
    .then(response => response.json())
}


const getReviewById = (id) => {
    return fetch(`http://localhost:8088/reviews/${id}?`)
        .then(res => res.json())
}

const deleteReview = reviewId => {
    return fetch(`http://localhost:8088/reviews/${reviewId}`, {
        method: "DELETE"
    })
    .then(getReviews)
}

const updateReview = review => {
return fetch(`http://localhost:8088/reviews/${review.id}`, {
    method: "PUT",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
})
    .then(getReviews)
}

/*
    You return a context provider which has the
    `reviews` state, `getReviews` function,
    and the `addReview` function as keys. This
    allows any child elements to access them.
  */
    return (
    <ReviewContext.Provider value={{

        reviews, getReviews, addReview, getReviewById, deleteReview, updateReview, searchTerms, setSearchTerms
    }}>
        {props.children}
        </ReviewContext.Provider>
)
}