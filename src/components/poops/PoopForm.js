import React, { useContext, useEffect, useState } from "react";
import { PoopContext } from "./PoopProvider"
// import "./Poop.css"
import { useParams, useHistory } from 'react-router-dom';

const structureOfDate = {
    hour: '2-digit',
    minute: '2-digit',
    year: "numeric",
    month: "numeric",
    day: "numeric"
}

export const PoopForm = () => {

/*
useContext() - is a way to pass data through the component tree w/o havin to pass down 
manually at every level.
useContext() - lets you subscribe to React context without introducing nesting.
useContext() - Used by UI components that need data stored in the context, and 
exposed by the provider component.
*/
    const { addPoop, getPoopById, updatePoop } = useContext(PoopContext)
    const { getPoops } = useContext(PoopContext)
    // console.log(poops)

/*useState hook takes the initial value of our state as the only argument, and it
returns an array of two elements. The first element is our state variable and
the second element is a function in which we can use the update the value
of the state variable.

review is the state variable 
setReview is a function which we can use to update the value of review.
Every time state is updated, the component will re-render
*/

/*
const [review, setReview] = useState({})

this is declaring review as a vairable and setReview as a function that sets the state 
of the variable and invokes it

/*useState hook takes the initial value of our state as the only argument, and it
returns an array of two elements. The first element is our state variable and
the second element is a function in which we can use the update the value
of the state variable.

review is the state variable 
setReview is a function which we can use to update the value of food.
Every time state is updated, the component will re-render

useState to hold and set the array of reviews.
const reviews  = []
*/

    const [poop, setPoops] = useState({
        id: "",
        userId: parseInt(sessionStorage.getItem("app_user_id")),
        note: "",
        timestamp: "",
    });

    //wait for data before button is active. Look at the button to see how it's setting itself to disabled or not based on this state
const [isLoading, setIsLoading] = useState(true);
const { poopId } = useParams();
const history = useHistory();

useEffect(() => {
    getPoops()
}, [])


//when field changes, update state. This causes a re-render and updates the view.
//Controlled component
const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.
        
        Spread syntax (...) allows an iterable such as an array expression or string to be expanded in 
        places where zero or more arguments (for function calls) or elements (for array literals) are 
        expected, or an object expression to be expanded in places where zero or more key-value pairs
        (for object literals) are expected.

        Spread syntax can be used when all elements from an object or array meeds to be included in a list of some kind

        ... = function passes all the values in the array
        review =  is the array name
        */
    
    const newPoop = { ...poop }
    const dateRep = new Date()

    //poop is an object with properties.
    //set the property to the new value
    newPoop[event.target.id] = event.target.value
    newPoop.timestamp = `${dateRep.toLocaleDateString('en-US', structureOfDate)}`

    //update state
    setPoops(newPoop)
}

const handleSavePoop = () => {

    setIsLoading(true);
    // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of an animal
    if (poopId){
        //PUT - update
        updatePoop({
            id: poop.id,
            userId: parseInt(poop.userId),
            note: poop.note,
            timestamp: poop.timestamp,
        })
        .then(() => history.push(`/poops/detail/${poop.id}`))
    }else {
        //POST - add
        addPoop ({
            id: poop.id,
            userId: parseInt(poop.userId),
            note: poop.note,
            timestamp: poop.timestamp,
        })
        .then(() => history.push("/poops"))
    }
}


// Get poops. If poopId is in the URL, getPoopById
useEffect(() => {
    getPoops().then(() => {
    if (poopId) {
        getPoopById(poopId)
        .then(poop => {
            setPoops(poop)
            setIsLoading(false)
        })
    } else {
        setIsLoading(false)
    }
    })
}, [])

return (
    <form className="poopForm">
    <h2 className="poopForm__title">{poopId ? "Edit Poop" : "Add Poop"}</h2>
    <fieldset>
        <div className="poop__note">
            <label htmlFor="note">Note:</label>
            <input type="text" id="note" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Text" value={poop.note}/>
        </div>
    </fieldset>
    {/* <fieldset>
        <div className="poop__timeStamp">
            <label htmlFor="timestamp">Timestamp:</label>
            <input type="datetime" id="timestamp" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Timestamp" value={poop.timestamp}/>
        </div>     
    </fieldset> */}
    <button className="btn btn-primary"
        disabled={isLoading}

        onClick={event => {
            // Prevent browser from submitting the form and refreshing the page
        event.preventDefault()
        handleSavePoop()
        }}>
    {poopId ? "Save Poop" : "Add Poop"}</button>
    </form>
)
}



