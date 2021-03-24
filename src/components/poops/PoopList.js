import React, { useEffect, useContext, useState } from "react"
import { Poop } from "./Poop"
// import "./Poop.css"
import { PoopContext } from "./PoopProvider"
import { useHistory } from "react-router-dom";


export const PoopList = () => {
    const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))

    // This state changes when `getCustomers()` is invoked below
    const { poops, getPoops, searchTerms } = useContext(PoopContext)

    const [ filteredPoops, setFiltered ] = useState([])
    const history = useHistory()

    const listOfPoops = poops.filter(poop => currentUserId === poop.userId)


    useEffect(() => {
        getPoops()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching customers
            const subset = poops.filter(poop => poop.note.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all customers
            setFiltered(poops)
        }
        }, [searchTerms, poops])

    return (
    <>
        <h1>Bowel Movements</h1>
        <button onClick={() => { history.push("/poops/create") }}>Add Poop</button>

        <div className="poops">
        {
            listOfPoops.map(poop => {
            return <Poop key={poop.id} poop={poop} />
        })
        }
        </div>
    </>
)
}

