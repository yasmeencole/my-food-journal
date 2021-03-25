import React, { useContext } from "react"
import { FoodContext } from "./FoodProvider"
// import "./Food.css"
import "./Food"

export const FoodSearch = () => {
    const { setSearchTerms } = useContext(FoodContext)

    return (
        <>
        Food Search:
        <input type="text"
            className="input--wide" 
            onKeyUp={(event) => setSearchTerms(event.target.value)}
            placeholder="Search for a food... " />
        </>
    )
}