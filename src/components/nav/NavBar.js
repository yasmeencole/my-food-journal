import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'

export const NavBar = (props) => {
  return (
    <nav className="navbar-custom, text-white flex-md-nowrap p-0 shadow" >

      <ul className="nav ">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/foods">My Foods</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/badFoods">Bad Food</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reviews">Reviews</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/poops">Poop</Link>
        </li>
      </ul>
    </nav>
  )
}