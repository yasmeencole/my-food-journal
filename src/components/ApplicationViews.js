import React from "react"
import { Route } from "react-router-dom"
import { FoodProvider } from "./foods/FoodProvider"
import { FoodList } from "./foods/FoodList"
import { FoodDetail } from "./foods/FoodDetail"
import { FoodForm } from "./foods/FoodForm"
import { ReviewProvider } from "./reviews/ReviewProvider"
import { ReviewList } from "./reviews/ReviewList"
import { ReviewDetail } from "./reviews/ReviewDetail"
import { ReviewForm } from "./reviews/ReviewForm"
import { MealProvider } from "./meals/MealProvider"
import { PoopProvider } from "./poops/PoopProvider"
import { PoopList } from "./poops/PoopList"
import { PoopDetail } from "./poops/PoopDetail"
import { PoopForm } from "./poops/PoopForm"
import { FoodSearch } from "./foods/FoodSearch";
import { BadFood } from "./foods/BadFood"
import { ReviewSearch } from "./reviews/ReviewSearch";


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
                <FoodSearch />
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
    <FoodProvider>
    <Route path="/badFoods">
        <BadFood />
    </Route>
    </FoodProvider>

            {/* http://localhost:8088/reviews */}
    <MealProvider>        
    <FoodProvider>        
        <ReviewProvider>
            <Route exact path="/reviews">
                <ReviewSearch />
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
    <PoopProvider>
        <Route exact path="/poops">
            <PoopList />
        </Route>
        <Route path="/poops/create">
            <PoopForm />
        </Route>
        <Route path="/poops/detail/:poopId(\d+)">
            <PoopDetail />
        </Route> 
        <Route path="/poops/edit/:poopId(\d+)">
            <PoopForm />
        </Route>   
    </PoopProvider>   
    
    </>
    )
}
