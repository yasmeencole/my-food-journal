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
    const { addPoop, getPoopById, updatePoop } = useContext(PoopContext)
    const { getPoops } = useContext(PoopContext)
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
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
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newPoop = { ...poop }
    const dateRep = new Date()

    //animal is an object with properties.
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


// Get locations. If employeeId is in the URL, getEmployeeById
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
        <div className="poop__timeStamp">
            <label htmlFor="timestamp">Timestamp:</label>
            <input type="datetime" id="timestamp" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Timestamp" value={poop.timestamp}/>
        </div>     
    </fieldset>
    <fieldset>
        <div className="poop__note">
            <label htmlFor="note">Note:</label>
            <input type="text" id="note" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Text" value={poop.note}/>
        </div>
    </fieldset>
    <button className="btn btn-primary"
        disabled={isLoading}

        onClick={event => {
        event.preventDefault()
        handleSavePoop()
        }}>
    {poopId ? "Save Poop" : "Add Poop"}</button>
    </form>
)
}



