import React from "react"
import { Route } from "react-router-dom"
import { FoodList } from "./foods/FoodList"
import { ReviewList } from "./reviews/ReviewList"
import { FoodProvider } from "./foods/FoodProvider"
import { ReviewProvider } from "./reviews/ReviewProvider"
import { FoodDetail } from "./foods/FoodDetail"
import { ReviewDetail } from "./reviews/ReviewDetail"
import { FoodForm } from "./foods/FoodForm"
import { ReviewForm } from "./reviews/ReviewForm"
import { MealProvider } from "./meals/MealProvider"


export const ApplicationViews = () => {
    return (
    <>
    {/* http://localhost:8088 */}
    <Route exact path="/">

    </Route>

    {/* http://localhost:8088/foods */}
    <MealProvider>
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
    </MealProvider>

        {/* http://localhost:8088/badFoods */}
    {/* <Route path="/badFoods">

    </Route> */}

            {/* http://localhost:8088/reviews */}
    <MealProvider>        
    <FoodProvider>        
        <ReviewProvider>
            <Route exact path="/reviews">
                <ReviewList />
            </Route>
            <Route path="/reviews/create">
                <ReviewForm />
            </Route>
            <Route path="/reviews/detail/:reviewId(\d+)">
                <ReviewDetail />
            </Route>
            <Route path="/reviews/edit/:reviewId(\d+)">
                <ReviewForm />
            </Route>
        </ReviewProvider>
    </FoodProvider>
    </MealProvider>


            {/* http://localhost:8088/poops */}
    {/* <Route path="/poops">

    </Route> */}
    
    </>
    )
}
