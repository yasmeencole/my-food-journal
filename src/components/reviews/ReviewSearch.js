import React, { useContext } from "react"
import { ReviewContext } from "./ReviewProvider"
// import "./Review.css"
import "./Review"

export const ReviewSearch = () => {

    // useContext() - Used by UI components that need data stored in the context, and exposed by the provider component.
    const { setSearchTerms } = useContext(ReviewContext)

    return (
        <>
        Review Search:
        <input type="text"
            className="input--wide"
            onKeyUp={(event) => setSearchTerms(event.target.value)}
            placeholder="Search for a review... " />
        </>
    )
}