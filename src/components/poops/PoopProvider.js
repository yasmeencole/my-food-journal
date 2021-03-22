import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const PoopContext = createContext()

// This component establishes what data can be used.
export const PoopProvider = (props) => {
    const [poops, setPoops] = useState([])

    const [ searchTerms, setSearchTerms ] = useState("")

    const getPoops = () => {
    return fetch("http://localhost:8088/poops")
        .then(response => response.json())
        .then(poopsData => setPoops(poopsData))
}

const addPoop = poopObj => {
    return fetch("http://localhost:8088/poops", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(poopObj)
    })
    .then(response => response.json())
}

const getPoopById = (id) => {
    return fetch(`http://localhost:8088/poops/${id}`)
        .then(res => res.json())
}

const releasePoop = poopId => {
    return fetch(`http://localhost:8088/poops/${poopId}`, {
        method: "DELETE"
    })
    .then(getPoops)
}

const updatePoop = poop => {
    return fetch(`http://localhost:8088/poops/${poop.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(poop)
    })
        .then(getPoops)
    }
/*
    You return a context provider which has the
    `animals` state, `getAnimals` function,
    and the `addAnimal` function as keys. This
    allows any child elements to access them.
  */
    return (
    <PoopContext.Provider value={{
    //   animals: animals, 
    //   getAnimals: getAnimals
        poops, getPoops, addPoop, getPoopById, releasePoop, updatePoop, searchTerms, setSearchTerms
    }}>
        {props.children}
        </PoopContext.Provider>
)
}