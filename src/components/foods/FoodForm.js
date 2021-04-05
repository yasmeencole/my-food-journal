import React, { useContext, useEffect, useState } from "react"
import { FoodContext } from "./FoodProvider"
import "./Food.css"
import { useParams, useHistory } from 'react-router-dom';
import { MealContext } from "../meals/MealProvider"
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'


const structureOfDate = {
    hour: '2-digit',
    minute: '2-digit',
    year: "numeric",
    month: "numeric",
    day: "numeric"
}


export const FoodForm = () => {

/*
useContext() - is a way to pass data through the component tree w/o havin to pass down 
manually at every level.
useContext() - lets you subscribe to React context without introducing nesting.
useContext() - Used by UI components that need data stored in the context, and 
exposed by the provider component.
*/

    const { addFood, getFoodById, updateFood, getFoods } = useContext(FoodContext)

// meals are the current state and getMeals is the function that allows us to update the state
    const { meals, getMeals } = useContext(MealContext)


// useState( '1' ) is setting the intial value of radios to 1
    const [radioValue] = useState( '1' ); 
    
/*defines radio buttons and gives them a value of true or false
if a food is "Good" isGood === true
if a food is "Bad" isGood === false
*/
    const radios = [

        { name: 'Good', value: true },
        { name: 'Bad', value: false },
    ];
    

/*
const [food, setFoods] = useState({})

this is declaring food as a vairable and setFoods as a function that sets the state 
of the variable and invokes it

/*useState hook takes the initial value of our state as the only argument, and it
returns an array of two elements. The first element is our state variable and
the second element is a function in which we can use the update the value
of the state variable.

food is the state variable 
setFoods is a function which we can use to update the value of food.
Every time state is updated, the component will re-render

useState to hold and set the array of foods.
const foods  = []
*/

    const [food, setFoods] = useState({
        id: "",
        userId: parseInt(sessionStorage.getItem("app_user_id")),
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


// Reach out to the world and get foods state on initialization

    useEffect(() => {
        getFoods()
    }, [])

// handleControlledInputChange is responsible for changing the event
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.
        
        Spread syntax (...) allows an iterable such as an array expression or string to be expanded in 
        places where zero or more arguments (for function calls) or elements (for array literals) are 
        expected, or an object expression to be expanded in places where zero or more key-value pairs
        (for object literals) are expected.

        Spread syntax can be used when all elements from an object or array meeds to be included in a list of some kind

        ... = function passes all the values in the array
        food =  is the array name
        */
        const newFood = { ...food }
        // ...food is a copy of const [food, setFoods] = useState({


        const dateRep = new Date()
console.log("value :" , event.target.value, "id :" , event.target.name)
/* Food is an object with properties. Set the property to the new value using 
object bracket notation. */

// this tells the button to grab the id of the new food that has been created
        if (event.target.id) {
            newFood[event.target.id] = event.target.value
/*
if there is no id then grab the name of the new food that was created
this will grab the value, which is the "name". The name is as a string and it needs to be 
converted to a boolean of true and false.
*/
        }else {
            if (event.target.value === "true") {
                newFood[event.target.name] = true
            }
            else {
                newFood[event.target.name] = false

            }

        }
        newFood.timestamp = `${dateRep.toLocaleDateString('en-US', structureOfDate)}`
        // update state
        setFoods(newFood)
    }

    const handleClickSaveFood = () => {

        setIsLoading(true);

/* This is how we check for whether the form is being used for editing or creating. 
If the URL that got us here has an id number in it, we know we want to update an 
existing record of an review. 
*/
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
                mealTypeId: parseInt(food.mealTypeId),
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
            // else - there is no data
            setIsLoading(false)
        }
        })
    }, [])

        return (
        <Form className="foodForm">
            <h2 className="foodForm__title">{foodId ? "Edit Food" : "Add New Food"}</h2>
                        {/* dropdown to select a Type of Meal */}
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
                <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        id="isGood"
                        key={idx}
                        type="radio"
                        variant="secondary"
                        name="isGood"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={handleControlledInputChange}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>
            </fieldset>
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
            {/* input for picture url */}
            <fieldset>
                <div className="food__url">
                    <label htmlFor="url">Link:</label>
                    <input type="url" id="url" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="https://example.com" pattern="https://.*" value={food.url}/>
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="food__timeStamp">
                    <label htmlFor="timestamp">Timestamp:</label>
                    <input type="datetime" id="timestamp" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Timestamp" value={food.timestamp}/>
                </div>
                
            </fieldset> */}
            <button className="btn btn-primary"
                disabled={isLoading}

                onClick={event => {
                    // Prevent browser from submitting the form and refreshing the page
                    event.preventDefault()
                    handleClickSaveFood()
                }}>
                {foodId ? "Save Food" : "Add Food"}
            </button>
        </Form>
    )
}