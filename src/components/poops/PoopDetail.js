import React, { useContext, useEffect, useState } from "react"
import { PoopContext } from "./PoopProvider"
// import "./Poop.css"
import { useParams, useHistory } from "react-router-dom"
// import { userStorageKey } from "../auth/authSettings"
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';


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

//         <section className={parseInt(currentUserId) === poop.userId ? "currentUser" : "otherUserPoop"}>
//         <div className="poop__timestamp">Timestamp: {poop.timestamp}</div>
//         <h3 className="poop__note">{poop.note}</h3>
//     {parseInt(sessionStorage.getItem(userStorageKey)) === poop.userId ?
// <div>

//     {/* <button onClick={handleRelease}>Remove Poop</button> */}

//     {/* this is the edit button, when clicked it sends a put request that updates the poop */}
//     <button onClick={() => { history.push(`/poops/edit/${poop.id}`) }}>Edit</button>
    
// </div>
//         : ""}
// </section>

// {/* <section className="poop"> */}
// {/* <h3 className="food__name">{food.name}</h3> */}
// {/* <div className="food__rating">Rating: {food.review?.rating}</div> */}

<Card className="poopCard" style={{ width: '30rem' }}>
{/* <Card.Img variant="top" src={food.url} /> */}
<Card.Body>
<Card.Header>Bowel Movement Details:</Card.Header>

<Card.Text>
{/* Bowel Movement Details: */}
<br />
<br />

{poop.note}
<br />
<br />

{poop.timestamp}
</Card.Text>

</Card.Body>
{/* </Card> */}

{parseInt(sessionStorage.getItem("app_user_id")) === poop.userId ?
<div>
{/* <Button onClick={handleRelease}>Delete</Button> */}

{/* <br /> */}

{/* this is the edit button, when clicked it sends a put request that updates the food */}
<Button className="poopEditButton" onClick={() => { history.push(`/poops/edit/${poop.id}`) }}>Edit</Button>
</div>
        : ""}
</Card>
// </section>
    )
}