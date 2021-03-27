import React, { useContext, useState, useEffect }  from "react"
import { FoodContext } from './FoodProvider'
import "./Food.css"
import { Food } from "./Food"


export const BadFood = () =>{
    // use sessionstorage to store user in database. 
    // Checks for currentUserId and filters through foods to find 
    // the badfoods only for the current logged in user
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))

    const { foods, getFoods } = useContext(FoodContext)

    useEffect(() => {
        getFoods()
    }, [])


    const listOfFoods = foods.filter(food => currentUserId === food.userId)


return (
<>
<section>
    <h2 className="food__badFoodsTitle">Bad Foods</h2>

    <div className="foods">
    {
        // .map() method creates a new array with the results of calling a function for every array element.
        
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




