import React from "react"
import { Route } from "react-router-dom"


export const ApplicationViews = () => {
    return (
    <>
    {/* http://localhost:8088 */}
    <Route exact path="/">

    </Route>

    {/* http://localhost:8088/foods */}
    <Route path="/foods">

    </Route>

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
