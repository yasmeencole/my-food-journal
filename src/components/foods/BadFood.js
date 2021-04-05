import React, { useContext, useEffect }  from "react"
import { FoodContext } from './FoodProvider'
import "./Food.css"
import { Food } from "./Food"


export const BadFood = () =>{
    // use sessionstorage to store user in database. 
    // Checks for currentUserId and filters through foods to find 
    // the badfoods only for the current logged in user
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))


    // useContext() - Used by UI components that need data stored in the context, and exposed by the provider component.
    const { foods, getFoods } = useContext(FoodContext)

    // they can affect other components and can’t be done during rendering

    useEffect(() => {
        getFoods()
        console.log(foods, "food")
    }, [])


    const listOfFoods = foods.filter(food => currentUserId === food.userId)


return (
<>
<section>
    <h2 className="food__badFoodsTitle">My Bad Foods</h2>

    <div className="foods">
    {
        /* .map() is a method that calls a provided call back function once for each element in the array in order to construct 
        a new array from the results. 
        
        each time the callback excutes the returned value us executed 
        */
        // maps through list of foods and determines if the food is bad. If the food.isGood is === to False
        //  then the food is considered bad and it will send a copy of the food to the bad foods component.

        listOfFoods.map(food => {
            if (food.isGood === false)
        return <Food key={food.id} food={food} />
    })
    }
    </div>
</section>
</>
)
}




