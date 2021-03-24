import React, { useEffect, useContext, useState } from "react"
import { Food } from "./Food"
import "./Food.css"
import { FoodContext } from "./FoodProvider"
import { useHistory } from "react-router-dom";
// import { userStorageKey } from "../auth/authSettings"



export const FoodList = () => {
    // const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))

    // This state changes when `getFoods()` is invoked below
    const { foods, getFoods, searchTerms } = useContext(FoodContext)

    const [ filteredFoods, setFiltered ] = useState([])
    const history = useHistory()


    useEffect(() => {
        getFoods()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching foods
            const subset = foods.filter(food => food.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all foods
            setFiltered(foods)
        }
        }, [searchTerms, foods])

    return (
    <>
    <section>
        <h2 className="food__myFoodsTitle">My Foods</h2>
        <button onClick={() => { history.push("/foods/create") }}>New Food</button>

        <div className="foods">
        {
            filteredFoods.map(food => {
            return <Food key={food.id} food={food} />
        })
        }
        </div>
    </section>
    </>
)
}

