import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const FoodContext = createContext()

// This component establishes what data can be used.
export const FoodProvider = (props) => {
    const [foods, setFoods] = useState([])

    const [ searchTerms, setSearchTerms ] = useState("")

    // useState([])  is to hold and set the array of food
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
    } 

    const getFoods = () => {
    return fetch("http://localhost:8088/foods?_expand=user")
        .then(response => response.json())
        .then(data => data.sort(timestampDate))
        .then(foodsData => setFoods(foodsData))
}

const addFood = foodObj => {
    return fetch("http://localhost:8088/foods", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(foodObj)
    })
    .then(response => response.json())
}


const getFoodById = (id) => {
    return fetch(`http://localhost:8088/foods/${id}`)
        .then(res => res.json())
}

const deleteFood = foodId => {
    return fetch(`http://localhost:8088/foods/${foodId}`, {
        method: "DELETE"
    })
    .then(getFoods)
}

const updateFood = food => {
return fetch(`http://localhost:8088/foods/${food.id}`, {
    method: "PUT",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(food)
})
    .then(getFoods)
}

/*
    You return a context provider which has the
    `foods` state, `getFoods` function,
    and the `addFood` function as keys. This
    allows any child elements to access them.
  */
    return (
    <FoodContext.Provider value={{
    //   foods: foods, 
    //   getFoods: getFoods
        foods, getFoods, addFood, getFoodById, deleteFood, updateFood, searchTerms, setSearchTerms
    }}>
        {props.children}
        </FoodContext.Provider>
)
}