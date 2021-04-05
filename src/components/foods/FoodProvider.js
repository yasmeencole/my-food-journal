// import the main React library, and two functions that it exports.
import React, { useState, createContext } from "react"


/* 
export const FoodContext = createContext()

createContext() - creates a context object when react renders a component that 
subscribes to this context object. It will read the current context value from the 
closest matching provider above it in the tree.

createContext() - creates the context to be used by other components that need data.
The context is imported and used by individual components that need data.
*/
export const FoodContext = createContext()
// Nothing is stored in the context when it is defined.

/*
export const FoodProvider = (props) => {}
This component establishes what data can be used, because it is the parent component.

contextProvider is waht you want to wrap all of the code that needs access to the 
information in the context. It has a single prop value. Which is going to be whatever 
the value of the context is.

all components and their children have access to the context. 

context is used for passing down props to any of the children. 

Props - are arguments that are passed into react components. Component recieves the
argument as a props object. 
Props are how you pass data from one component to another, as a parameter. 
Props are a representation on all the data.
*/


export const FoodProvider = (props) => {
/* data provider component will allow other components to use the data in the context.
Define a single property(props) for each provider defined in your system and react 
will send an object to each child component */

/* 
useState([]) - is a hook (function) that allows you to have state variables in 
functional components. You pass the inital state to this function and it returns a 
variable w/ the current state value & another function to update this value. 

is to hold and set the array of foods. useState() defines a variable 
that holds the state of the component, and a function that updates it. 

foods = current state
setFoods = function that allows us to update the current state. Every time setState
is called it re-renders our component. 
useState([]) = default state/value
*/   

    const [foods, setFoods] = useState([])

    const [ searchTerms, setSearchTerms ] = useState("")


    const timestampDate = (currurentDate, followingDate) => {
    /*
    This will sort by month, day, year, and time.
        
    This is a workaround to json-server's &_sort= .
    Does not sort correctly if using double-digit days.
    */
    /* Date constructor allows for retrivals of the date and time

    The parse() method takes a date string (such as "2011-10-10T14:48:00") and returns
    the number of milliseconds since January 1, 1970, 00:00:00 UTC.
     */
    if ( Date.parse(followingDate.timestamp) < Date.parse(currurentDate.timestamp) ) { return -1; }
    if ( Date.parse(followingDate.timestamp) > Date.parse(currurentDate.timestamp) ) { return 1; }
    return 0;
    } 

/* below are functions that perform state transitions in the database, and then 
ensure that the application state stays in sync. */

// the getFoods function fetches data from json database and then returns it
    const getFoods = () => {
    // Request the data fetch("http://localhost:8088/foods?_embed=reviews")

    // the fetch call is going to get the "foods" 
    // embed from parent to child

    return fetch("http://localhost:8088/foods?_embed=reviews")

    // Convert the JSON string response to a JavaScript data structure (object or array)
    // a string is returned from the fetch then .json converts the string into the data structure that is set up in my json database
        .then(response => response.json())


        // .sort is an array methoda that sorts the data array by timestamp
        .then(data => data.sort(timestampDate))


        // Do something with the data
        // foodsData = variable
        // foodsData = this updates the state of foods
        // setFoods then passes in foodsData. 
        // (foodsData) is setting the state of setFoods
        .then(foodsData => setFoods(foodsData))
}

// post request that adds a new food when add button is clicked
// expand brings back object related to child components
const addFood = foodObj => {
    return fetch("http://localhost:8088/foods?_expand=user", {
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

// delete request that deletes a food when delete button is clicked
const deleteFood = foodId => {
    return fetch(`http://localhost:8088/foods/${foodId}`, {
        method: "DELETE"
    })
    .then(getFoods)
}

// put request that updates food when edit button is clicked
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

/*
    other components can access the array of objects being stored in the foods 
    variable, and they can invoke the getFoods, addFood, deleteFood, etc. functions.
*/
    
    return (
        // FoodContext.Provider allows you to access child components
    <FoodContext.Provider value={{
        
    // these are the child components of FoodContext.Provider
        foods, getFoods, addFood, getFoodById, deleteFood, updateFood, searchTerms, setSearchTerms
    }}>
        {props.children}
        </FoodContext.Provider>
)
}