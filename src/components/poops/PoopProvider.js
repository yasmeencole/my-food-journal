// import the main React library, and two functions that it exports.
import React, { useState, createContext } from "react"

/* 
export const PoopContext = createContext()

createContext() - creates a context object when react renders a component that 
subscribes to this context object. It will read the current context value from the 
closest matching provider above it in the tree.

createContext() - create the context to be used by other components that need data.
The context is imported and used by individual components that need data.
*/
export const PoopContext = createContext()

/*
export const PoopProvider = (props) => {}
This component establishes what data can be used.

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
export const PoopProvider = (props) => {
/* data provider component will allow other components to use the data in the context.
Define a single property(props) for each provider defined in your system and react 
will send an object to each child component */

/* 
useState([]) - is a hook (function) that allows you to have state variables in 
functional components. You pass the inital state to this function and it returns a 
variable w/ the current state value & another function to update this value. 

is to hold and set the array of poops. useState() defines a variable 
that holds the state of the component, and a function that updates it. 

poops = current state
setPoops = function that allows us to update the current state. Every time setState
is called it re-renders our component. 
useState([]) = default state/value
*/   
    const [poops, setPoops] = useState([])

    const [ searchTerms, setSearchTerms ] = useState("")

/* below are functions that perform state transitions in the database, and then 
ensure that the application state stays in sync. */

// the getPoops function fetches data from json database and then returns it    
    const getPoops = () => {

// the fetch call is going to get the "poops" 
    return fetch("http://localhost:8088/poops")

    // Convert the JSON string response to a JavaScript data structure (object or array)
    // a string is returned from the fetch then .json converts the string into the data structure that is set up in my json database
        .then(response => response.json())

                // Do something with the data
        // poopsData = variable
        // poopsData = this updates the state of poops
        // setPoops then passes in poopsData. 
        // (poopsData) is setting the state of setPoops
        .then(poopsData => setPoops(poopsData))
}

// post request that adds a new review when add button is clicked
const addPoop = poopObj => {
    return fetch("http://localhost:8088/poops", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(poopObj)
    })
    .then(response => response.json())
}

const getPoopById = (id) => {
    return fetch(`http://localhost:8088/poops/${id}`)
        .then(res => res.json())
}

// delete request that will delete a poop when delete button is clicked
const releasePoop = poopId => {
    return fetch(`http://localhost:8088/poops/${poopId}`, {
        method: "DELETE"
    })
    .then(getPoops)
}

// put request that updates reviews when edit button is clicked
const updatePoop = poop => {
    return fetch(`http://localhost:8088/poops/${poop.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(poop)
    })
        .then(getPoops)
    }
/*
    You return a context provider which has the
    `animals` state, `getAnimals` function,
    and the `addAnimal` function as keys. This
    allows any child elements to access them.
  */
/*
    other components can access the array of objects being stored in the poops 
    variable, and they can invoke the getPoops, addPoop, releasePoop, etc. functions.
*/
    
    return (
    <PoopContext.Provider value={{

    // these are the child components of PoopContext.Provider
        poops, getPoops, addPoop, getPoopById, releasePoop, updatePoop, searchTerms, setSearchTerms
    }}>
        {props.children}
        </PoopContext.Provider>
)
}