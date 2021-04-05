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

        <section className="food">
        <h3 className="food__name">{food.name}</h3>
        {/* <div className="food__rating">Rating: {food.review?.rating}</div> */}

        <div className="food__description">About this meal: {food.description}</div>

        <div className="food__timestamp">Timestamp: {food.timestamp}</div>
        <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
        {parseInt(sessionStorage.getItem("app_user_id")) === food.userId ?

        <div>
        <button onClick={handleRelease}>Release food</button>

        {/* this is the edit button, when clicked it sends a put request that updates the food */}
        <button onClick={() => { history.push(`/foods/edit/${food.id}`) }}>Edit</button>
        </div>
                : ""}

        </section>
    )
}
