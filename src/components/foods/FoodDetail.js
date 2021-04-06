import React, { useContext, useEffect, useState } from "react"
import { FoodContext } from "./FoodProvider"
import "./Food.css"
import { useParams, useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";



export const FoodDetail = () => {

// useContext() - Used by UI components that need data stored in the context, and exposed by the provider component.

    const { getFoodById, deleteFood } = useContext(FoodContext)

    const [food, setFoods] = useState({})

/*
useParams() - returns an object of the params for the route rendered.
Params are placeholders in the URL that begin with a colon, like the `:foodId` 
param defined in the route in the route below. 

Example: <Route path="/foods/detail/:foodId(\d+)">
*/
    const {foodId} = useParams();

/* The useHistory hook gives you access to the history instance that you may use to
navigate.

*/
    const history = useHistory();

    useEffect(() => {
        console.log("useEffect", food)
        getFoodById(foodId)
        .then((response) => {
            setFoods(response)
        })
    }, [])


    //handles the delete button on the food details. handleRelease gets the food by id then deletes it.
    const handleRelease = () => {
        deleteFood(food.id)
        .then(() => {
            history.push("/foods")
        })
    }

    
    return (
        
        // returns a representation of food details

        // <section className="foodDetails">
        // {/* <h3 className="food__name">{food.name}</h3> */}
        // {/* <div className="food__rating">Rating: {food.review?.rating}</div> */}

<Card className="foodCard" style={{ width: '20rem' }}>
    <Card.Img variant="top" src={food.url} />
    <Card.Body>
        <Card.Title className="food__DetailsName">
            <h2>
            {food.name}
            </h2>
        </Card.Title>

        <Card.Text>
        About this meal:
        <br />
        <br />

        {food.description}
        <br />
        <br />

        {food.timestamp}
        </Card.Text>

    </Card.Body>
    {/* </Card> */}

        {parseInt(sessionStorage.getItem("app_user_id")) === food.userId ?
        <div>
        <Button className="foodDeleteButton" onClick={handleRelease}>Delete</Button>

        {/* <br /> */}

        {/* this is the edit button, when clicked it sends a put request that updates the food */}
        <Button className="foodEditButton" onClick={() => { history.push(`/foods/edit/${food.id}`) }}>Edit</Button>
        </div>
                : ""}
    </Card>
        // </section>
    )
}
