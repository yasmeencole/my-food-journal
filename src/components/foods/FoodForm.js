import React, { useContext, useEffect, useState } from "react"
import { FoodContext } from "./FoodProvider"
import "./Food.css"
import { useParams, useHistory } from 'react-router-dom';
// import { userStorageKey } from "../auth/authSettings"
import { MealContext } from "../meals/MealProvider"


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
    const { meals, getMeals } = useContext(MealContext)

    const [food, setFoods] = useState({
        id: "",
        userId: "",
        name: "",
        url: "",
        description: "",
        mealTypeId: 0,
        isGood: true,
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

        setIsLoading(true);

        if (foodId){
            //PUT - update
            updateFood({
                id: food.id,
                userId: food.userId,
                name: food.name,
                url: food.url,
                description: food.description,
                mealTypeId: parseInt(food.mealTypeId),
                isGood: food.isGood,
                timestamp: food.timestamp
            })

            .then(() => history.push(`/foods/detail/${food.id}`))

        }else {
            //POST - add
            addFood({
                id: food.id,
                userId: food.userId,
                name: food.name,
                url: food.url,
                description: food.description,
                mealTypeId: food.mealTypeId,
                isGood: food.isGood,
                timestamp: food.timestamp
            })

            .then(() => history.push("/foods"))
        }
    }

        // Get foods. If foodId is in the URL, getFoodById
    useEffect(() => {
        getFoods().then(getMeals).then(() => {
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
                <div className="form-group">
                <label htmlFor="meal">Type of Meal: </label>
                <select value={food.mealTypeId} id="mealTypeId" className="form-control" onChange={handleControlledInputChange}>
                    <option value="0">Select a meal type</option>
                    {meals.map(meal => (
                    <option key={meal.id} value={meal.id}>
                        {meal.name}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="food__url">
                    <label htmlFor="url">Link:</label>
                    <input type="url" id="url" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="https://example.com" pattern="https://.*" value={food.url}/>
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