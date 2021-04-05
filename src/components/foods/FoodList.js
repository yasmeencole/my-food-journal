import React, { useEffect, useContext, useState } from "react"
import { Food } from "./Food"
import "./Food.css"
// import the context object you created in the provider component so that the Context hook can access the objects it exposes.
import { FoodContext } from "./FoodProvider"
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';


// get the foods data from the API to display the live data


export const FoodList = () => {
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))
    
/* useContext hook allows you to use data structures and functions that a parent 
provider component exposes.
*/

// child components of FoodContext.Provider { foods, getFoods, searchTerms }

/* useContext() - Used by UI components that need data stored in the context, and 
exposed by the provider component. */

// This state changes when `getFoods()` is invoked below
    const { foods, getFoods, searchTerms } = useContext(FoodContext)

// filteredFoods is the current state and setFilter is the function that allows you to update the state. useState([]) is the default value
// everytime the state is updated the component will re-render
    const [ filteredFoods, setFiltered ] = useState([])

// The useHistory hook gives you access to the history instance that is used to navigate.
    const history = useHistory()


// listOfFoods is === to the entire list of MyFoods
    const listOfFoods = filteredFoods.filter(food => currentUserId === food.userId)

/*
useEffect component reaches out to the API call for the foods because it was 
not handled during render.

useEffect is a Hook that allows you to perform side-effects in functional components. 
These effects are only executed after the component has rendered, therefore not blocking the render itself. 
*/
    useEffect(() => {
        console.log("FoodList: useEffect - getFoods")

        getFoods()
/* 
The dependency array is the second optional argument in the useEffect function.
It is an array of dependencies that when changed from the previous render, 
will recall the effect function defined in the first argument.

The dependency array [], logic within functions only occur when a function is 
invoked. Within a React component, useEffect is a function. After the return, 
useEffect is automatically invoked and since the dependency array is empty, it only 
runs the first time the component renders.
*/
}, [])

/*
Logic within functions only occurs when a function is invoked. After the return, 
useEffect is automatically invoked and since the dependency array is empty, 
it only runs the first time the component renders.

You can include dependencies in the array [] to cause useEffect to run additional times.
*/
    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching foods
            // filters through foods to find food name typed in search bar
            const subset = foods.filter(food => food.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display a list of all the foods
            setFiltered(foods)
        }
        }, [searchTerms, foods])

    return (
    <>
    <section>

        <h2 className="food__myFoodsTitle">My Foods</h2>
        {/* when New Food button is clicked users are rerouted to http://localhost:3000/foods/create  */}
        <Button className="food__newFoodButton"onClick={() => { history.push("/foods/create") }}>New Food</Button>

        <div className="foods">
        {
        /* .map() array method to iterate the array of foods and generate HTML for 
        each one by invoking the Food component function.
        
        pullung in list of foods to map through and returning a object*/
            listOfFoods.map(foodObj => {
                // console.table(foodObj)
        // "key" and "food" are properties on an object that gets passed as an argument
        // key={foodObj.id} === is equal to listOfFoods
        // food={foodObj} === is re-naming one individual food object from listOfFoods 
        // this return is passing in the Food.js componet.  
                return <Food key={foodObj.id} food={foodObj} />
        })
        }
        </div>

    </section>
    </>
)
}

