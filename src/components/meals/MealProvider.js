import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const MealContext = createContext()

// This component establishes what data can be used.
export const MealProvider = (props) => {
    const [meals, setMeals] = useState([])

    const getMeals = () => {
    return fetch("http://localhost:8088/meals")
        .then(response => response.json())
        .then(mealsData => setMeals(mealsData))
}

/*
    You return a context provider which has the
    `animals` state, `getAnimals` function,
    and the `addAnimal` function as keys. This
    allows any child elements to access them.
  */
    return (
    <MealContext.Provider value={{
    //   animals: animals, 
    //   getAnimals: getAnimals
    meals, getMeals
    }}>
        {props.children}
        </MealContext.Provider>
)
}