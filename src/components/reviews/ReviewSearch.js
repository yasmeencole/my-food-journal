import React, { useContext } from "react"
import { ReviewContext } from "./ReviewProvider"
// import "./Review.css"
import "./Review"

export const ReviewSearch = () => {
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