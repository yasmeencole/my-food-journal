import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. Makes a variable global.
export const UserContext = createContext()

// This component establishes what data can be used.
export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    //standard getUsers function
    const getUsers = () => {
        return fetch("http://localhost:8088/users")
        .then(res => res.json())
        .then(setUsers)
    }

    //POST function
    const newUser = userObj => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        })
        .then(getUsers)
    }

    //function to get user by ID
    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
    }

    //function to delete a user
    const deleteUser = userId => {
        return fetch(`http://localhost:8088/users/${userId}`, {
            method: "DELETE"
        })
            .then(getUsers)
    }

    //function to edit user
    const updateUser = user => {
        return fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }

    const [ searchTerms, setSearchTerms ] = useState("")

    //return the functions you want available
    return (
        <UserContext.Provider value={{
            users, getUsers, newUser, getUserById, deleteUser, updateUser, searchTerms, setSearchTerms
        }}>
            {props.children}
        </UserContext.Provider>
    )

}