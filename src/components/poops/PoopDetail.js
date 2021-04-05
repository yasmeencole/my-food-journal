import React, { useContext, useEffect, useState } from "react"
import { PoopContext } from "./PoopProvider"
// import "./Poop.css"
import { useParams, useHistory } from "react-router-dom"
import { userStorageKey } from "../auth/authSettings"


export const PoopDetail = (currentUserId) => {
    // useContext() - Used by UI components that need data stored in the context, and exposed by the provider component.

    const { getPoopById, releasePoop } = useContext(PoopContext)

    const [poop, setPoop] = useState({})

        /*
useParams() - returns an object of the params for the route rendered.
Params are placeholders in the URL that begin with a colon, like the `:foodId` 
param defined in the route in the route below. 

Example: <Route path="/poops/detail/:poopId(\d+)">
*/
    const {poopId} = useParams();

/* The useHistory hook gives you access to the history instance that you may use to
navigate.
*/    
    const history = useHistory();

    useEffect(() => {
        console.log("useEffect", poopId)
        getPoopById(poopId)
        .then((response) => {
            setPoop(response)
        })
    }, [])

    // const handleRelease = () => {
    //     releasePoop(poop.id)
    //     .then(() => {
    //         history.push("/poops")
    //     })
    // }

    return (
        // returns a representation of poop details

        <section className={parseInt(currentUserId) === poop.userId ? "currentUser" : "otherUserPoop"}>
        <div className="poop__timestamp">Timestamp: {poop.timestamp}</div>
        <h3 className="poop__note">{poop.note}</h3>
        {parseInt(sessionStorage.getItem(userStorageKey)) === poop.userId ?
<div>

    {/* <button onClick={handleRelease}>Remove Poop</button> */}

    {/* this is the edit button, when clicked it sends a put request that updates the poop */}
    <button onClick={() => { history.push(`/poops/edit/${poop.id}`) }}>Edit</button>
    
</div>
        : ""}
</section>
    )
}