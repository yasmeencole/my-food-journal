import React, { useEffect, useContext, useState } from "react"
import { Food } from "./Food"
import "./Food.css"
import { FoodContext } from "./FoodProvider"
import { useHistory } from "react-router-dom";


export const FoodList = () => {
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))
    

    // This state changes when `getFoods()` is invoked below
    const { foods, getFoods, searchTerms } = useContext(FoodContext)

    // filteredFoods is the current state and setFilter is the function that allows you to update the state. useState([]) is the default value
    const [ filteredFoods, setFiltered ] = useState([])

    // The useHistory hook gives you access to the history instance that you may use to navigate.
    const history = useHistory()


    // listOfFoods is === to the entire list of MyFoods
    const listOfFoods = filteredFoods.filter(food => currentUserId === food.userId)


    useEffect(() => {
        getFoods()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching foods
            // filters through foods to find food name typed in search bar
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
        {/* when New Food button is clicked users is rerouted to http://localhost:3000/foods/create  */}
        <button onClick={() => { history.push("/foods/create") }}>New Food</button>

        <div className="foods">
        {
            listOfFoods.map(food => {
                // food is an object inside the array
                return <Food key={food.id} food={food} />
            })
        }
        </div>

    </section>
    </>
)
}

