import React, { useContext, useState, useEffect }  from "react"
import { FoodContext } from './FoodProvider'
// import { useHistory } from 'react-router-dom'
import "./Food.css"
import { Food } from "./Food"




export const BadFood = ({ badFood }) =>{
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))
    // const history = useHistory(); 
    const { foods, getFoods } = useContext(FoodContext)

    useEffect(() => {
        getFoods()
    }, [])


    const listOfFoods = foods.filter(food => currentUserId === food.userId)


return (
<>
<section>
    <h2 className="food__badFoodsTitle">Bad Foods</h2>
    {/* <button onClick={() => { history.push("/badFoods") }}>New Food</button> */}

    <div className="foods">
    {
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




