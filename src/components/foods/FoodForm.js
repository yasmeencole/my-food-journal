import React, { useContext, useEffect, useState } from "react"
import { FoodContext } from "./FoodProvider"
import "./Food.css"
import { useParams, useHistory } from 'react-router-dom';
import { userStorageKey } from "../auth/authSettings"

const structureOfDate = {
    hour: '2-digit',
    minute: '2-digit',
    year: "numeric",
    month: "numeric",
    day: "numeric"
}

export const FoodForm = () => {
    const { addFood, getFoodById, updateFood } = useContext(FoodContext)
    const { getFoods } = useContext(FoodContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [food, setFoods] = useState({
        id: "",
        userId: 0,
        userId: parseInt(sessionStorage.getItem(userStorageKey)),
        name: "",
        image: "",
        description: "",
        mealType: "",
        timestamp: ""
    });

    const [isLoading, setIsLoading] = useState(true);
    const { foodId } = useParams();

    const history = useHistory();

    /*
    Reach out to the world and get foods state on initialization
    */
    useEffect(() => {
        getFoods()
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
        // NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newFood = { ...food }
        const dateRep = new Date()

        /* Food is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newFood[event.target.id] = event.target.value
        newFood.timestamp = `${dateRep.toLocaleDateString('en-US', structureOfDate)}`
        // update state
        setFoods(newFood)
    }

    const handleClickSaveFood = () => {

        setIsLoading(true)

        if (foodId){
            //PUT - update
            updateFood({
                id: food.id,
                userId: food.userId,
                name: food.name,
                image: food.image,
                description: food.description,
                mealType: food.mealType,
                timestamp: food.timestamp
            })

            .then(() => history.push(`/foods/detail/${food.id}`))

        }else {
            //POST - add
            addFood({
                id: food.id,
                userId: food.userId,
                name: food.name,
                image: food.image,
                description: food.description,
                mealType: food.mealType,
                timestamp: food.timestamp
            })

            .then(() => history.push("/foods"))
        }
        }

        // Get foods. If foodId is in the URL, getFoodById
    useEffect(() => {
        getFoods().then(() => {

            // if there is data
        if (foodId) {
            getFoodById(foodId)
            .then(food => {
                setFoods(food)
                setIsLoading(false)
            })
        } else {
            // else there is no data
            setIsLoading(false)
        }
        })
    }, [])

        return (
        <form className="foodForm">
            <h2 className="foodForm__title">{foodId ? "Edit Food" : "Add New Food"}</h2>
            <fieldset>
                <div className="food__name">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name of Food" value={food.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="food__description">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Description of Food" value={food.description}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="food__image">
                    <label htmlFor="image">Image:</label>
                    <input type="url" id="url" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="https://example.com" pattern="https://.*" value={food.image}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="food__timeStamp">
                    <label htmlFor="timestamp">Timestamp:</label>
                    <input type="datetime" id="timestamp" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Timestamp" value={food.timestamp}/>
                </div>
                
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}

                onClick={event => {
                    event.preventDefault()
                    handleClickSaveFood()
                }}>
                {foodId ? "Save Food" : "Add Food"}
            </button>
        </form>
    )
}