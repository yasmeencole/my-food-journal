import React, { useContext, useEffect, useState } from "react"
import { FoodContext } from "./FoodProvider"
import "./Food.css"
import { useParams, useHistory } from "react-router-dom"



export const FoodDetail = () => {
    
    const { getFoodById, deleteFood } = useContext(FoodContext)

    const [food, setFoods] = useState({})

    const {foodId} = useParams();
    const history = useHistory();

    useEffect(() => {
        // console.log("useEffect", foodId)
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
