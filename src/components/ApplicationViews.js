import React from "react"
import { Route } from "react-router-dom"
import { FoodList } from "./foods/FoodList"
import { FoodProvider } from "./foods/FoodProvider"
import { FoodDetail } from "./foods/FoodDetail"
import { FoodForm } from "./foods/FoodForm"


export const ApplicationViews = () => {
    return (
    <>
    {/* http://localhost:8088 */}
    <Route exact path="/">

    </Route>

    {/* http://localhost:8088/foods */}
    <FoodProvider>
        <Route exact path="/foods">
            <FoodList />
        </Route>
        <Route path="/foods/create">
            <FoodForm />
        </Route>
        <Route path="/foods/detail/:foodId(\d+)">
            <FoodDetail />
        </Route>
        <Route path="/foods/edit/:foodId(\d+)">
            <FoodForm />
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
