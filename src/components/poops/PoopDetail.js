import React, { useContext, useEffect, useState } from "react"
import { PoopContext } from "./PoopProvider"
// import "./Poop.css"
import { useParams, useHistory } from "react-router-dom"
import { userStorageKey } from "../auth/authSettings"


export const PoopDetail = (currentUserId) => {
    const { getPoopById, releasePoop } = useContext(PoopContext)

    const [poop, setPoop] = useState({})

    const {poopId} = useParams();
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
        <section className={parseInt(currentUserId) === poop.userId ? "currentUser" : "otherUserPoop"}>
        <div className="poop__timestamp">Timestamp: {poop.timestamp}</div>
        <h3 className="poop__note">{poop.note}</h3>
        {parseInt(sessionStorage.getItem(userStorageKey)) === poop.userId ?
<div>

    {/* <button onClick={handleRelease}>Remove Poop</button> */}
    <button onClick={() => { history.push(`/poops/edit/${poop.id}`) }}>Edit</button>
    
</div>
        : ""}
</section>
    )
}