import React, { useContext } from "react"
import { FoodContext } from "./FoodProvider"
// import "./Food.css"
import "./Food"

export const FoodSearch = () => {
    // useContext() - Used by UI components that need data stored in the context, and exposed by the provider component.

    const { setSearchTerms } = useContext(FoodContext)

    return (
        <>
        {/* Food Search: */}
        <input type="text"
            className="foodSearchText" 
            onKeyUp={(event) => setSearchTerms(event.target.value)}
            placeholder="Search for a food... " />
        </>
    )
}