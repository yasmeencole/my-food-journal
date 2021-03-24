import React, { useContext, useState, useEffect }  from "react"
import { FoodContext } from './FoodProvider'
import { useHistory } from 'react-router-dom'
import "./Food.css"
import { Food } from "./Food"




export const BadFood = ({ badFood }) =>{
    const history = useHistory(); 
    const { foods, getFoods } = useContext(FoodContext)

    // //   const [taskComplete, setTaskComplete] = useState()
    //   // User can select if task is complete. Will change isComplete in db
    // const handleControlledInputChange = (event) => {
    //     // let completedTask = document.querySelector(".task")
    //     if(event.target.checked === true){
    //         food.isGood = true
    //         // completedTask.style.display = "none"
    //     }else {
    //         food.isGood = false
    //     }
    //       updateTask({
    //           id: food.id,
    //           userId: food.userId,
    //           name: food.name,
    //           isGood: food.isGood
    //       })
    //       .then(() => history.push('/badFoods'))

    //   }

    //   const handleDelete = () => {
    //     deleteFood(food.id)
    //       .then(() => {
    //         history.push("/badFoods")
    //       })
    //   }

//  return (<>
//     <section className="food">
//         <h4 className="food__name">{food.name}</h4>
//         <div className="task__checkbox">
//             <p>Complete</p>
//             <input type="checkbox" id="taskComplete" onChange={handleControlledInputChange} 
//                 required autoFocus className="form-control" value={food.isGood} defaultChecked={food.isGood ? true : false} />
//         </div>
//         <button onClick={() => {
//         history.push(`/badFoods/edit/${food.id}`)}}>Edit</button>
//         <button onClick={handleDelete}>Delete</button>
        
//     </section>
//     </>
// )
const currentUserId = parseInt(sessionStorage.getItem("app_user_id"))
useEffect(() => {
    getFoods()
}, [])

// useEffect(() => {
//     if (foods.isGood === false) {
//         // If the search field is not blank, display matching foods
        const listOfFoods = foods.filter(food => currentUserId === food.userId)
//         setFiltered(listOfFoods)
//     } else {
//         // If the search field is blank, display all foods
//         setFiltered(foods)
//     }
//     }, [foods])

return (
<>
<section>
    <h2 className="food__myFoodsTitle">Bad Foods</h2>
    <button onClick={() => { history.push("/badFoods") }}>New Food</button>

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




