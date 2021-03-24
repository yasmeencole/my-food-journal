import React, { useContext, useEffect, useState } from "react"
import { FoodContext } from "./FoodProvider"
import "./Food.css"
import { useParams, useHistory } from "react-router-dom"
import { userStorageKey } from "../auth/authSettings"



export const FoodDetail = (currentUserId, review) => {
    const { getFoodById, deleteFood } = useContext(FoodContext)

    const [food, setFoods] = useState({})

    const {foodId} = useParams();
    const history = useHistory();

    useEffect(() => {
        console.log("useEffect", foodId)
        getFoodById(foodId)
        .then((response) => {
            setFoods(response)
        })
    }, [])

    const handleRelease = () => {
        deleteFood(food.id)
        .then(() => {
            history.push("/foods")
        })
    }

    return (
        <section className={parseInt(currentUserId) === food.userId ? "currentUser" : "otherUserFood"}>
        <h3 className="food__name">{food.name}</h3>
        {/* <div className="food__url" src={food.url}>{food.url}</div> */}
        <div className="food__rating">Rating: {food.reviews.rating}</div>

        <div className="food__description">About this meal: {food.description}</div>

        <div className="food__timestamp">Timestamp: {food.timestamp}</div>
        {parseInt(sessionStorage.getItem(userStorageKey)) === food.userId ?

        <div>
        <button onClick={handleRelease}>Release food</button>
        <button onClick={() => { history.push(`/foods/edit/${food.id}`) }}>Edit</button>
        </div>
                : ""}

        </section>
    )
}
