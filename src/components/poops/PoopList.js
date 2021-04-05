import React, { useEffect, useContext, useState } from "react"
import { Poop } from "./Poop"
// import "./Poop.css"
// import the context object you created in the provider component so that the Context hook can access the objects it exposes.
import { PoopContext } from "./PoopProvider"
import { useHistory } from "react-router-dom";


export const PoopList = () => {
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))

/* useContext hook allows you to use data structures and functions that a parent 
provider component exposes.
*/

// child components of PoopContext.Provider { poops, getPoops searchTerms }

/* useContext() - Used by UI components that need data stored in the context, and 
exposed by the provider component. */

// This state changes when `getPoops()` is invoked below
    const { poops, getPoops, searchTerms } = useContext(PoopContext)

// filteredPoops is the current state and setFilter is the function that allows you to update the state. 
// useState([]) is the default value
// everytime the state is updated the component will re-render
    const [ filteredPoops, setFiltered ] = useState([])

    // The useHistory hook gives you access to the history instance that is used to navigate.
    const history = useHistory()

    // listOfPoops is === to the entire list of Poop
    const listOfPoops = filteredPoops.filter(poop => currentUserId === poop.userId)

/*
useEffect component reaches out to the API call for the poops because it was 
not handled during render.

useEffect is a Hook that allows you to perform side-effects in functional components. 
These effects are only executed after the component has rendered, therefore not blocking the render itself. 
*/
    useEffect(() => {
        getPoops()
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
            // If the search field is not blank, display matching customers
            // filters through foods to find food name typed in search bar

            const subset = poops.filter(poop => poop.note.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all customers
            setFiltered(poops)
        }
        }, [searchTerms, poops])

    return (
    <>
        <h1>Bowel Movements</h1>
{/* when New Poop button is clicked users are rerouted to http://localhost:3000/foods/create  */}
        <button onClick={() => { history.push("/poops/create") }}>Add Poop</button>

        <div className="poops">
        {
/* .map() array method to iterate the array of poops and generate HTML for 
each one by invoking the Poop component function.
        
        pullung in list of poops to map through and returning a object*/
            listOfPoops.map(poopObj => {
                console.table(poopObj)

        // "key" and "poop" are properties on an object that gets passed as an argument
        // key={poopObj.id} === is equal to listOfPoops
        // poop={poopObj} === is re-naming one individual poop object from listOfPoops 
        // this return is passing in the Poop.js componet.
            return <Poop key={poopObj.id} poop={poopObj} />
        })
        }
        </div>
    </>
)
}

