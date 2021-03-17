import React from "react"
import { Route } from "react-router-dom"
import { FoodList } from "./foods/FoodList"
import { FoodProvider } from "./foods/FoodProvider"


export const ApplicationViews = () => {
    return (
    <>
    {/* http://localhost:8088 */}
    <Route exact path="/">

    </Route>

    {/* http://localhost:8088/foods */}
    <FoodProvider>
        <Route path="/foods">
            <FoodList />
        </Route>
    </FoodProvider>

        {/* http://localhost:8088/badFoods */}
    {/* <Route path="/badFoods">

    </Route> */}

            {/* http://localhost:8088/reviews */}
    {/* <Route path="/reviews">

    </Route> */}

            {/* http://localhost:8088/poops */}
    {/* <Route path="/poops">

    </Route> */}
    
    </>
    )
}
