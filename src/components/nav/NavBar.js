import React from "react"
// import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/Form'
import "../foods/FoodSearch"

export const NavBar = (props) => {
  return (
  <Navbar bg="dark" variant="dark" className="darkNavBar">
    <Navbar.Brand href="/">My Food Journal</Navbar.Brand>
    <Nav className="mr-auto">
      {/* <Nav.Link href="/home">Home</Nav.Link> */}
      <Nav.Link href="/foods">Foods</Nav.Link>
      <Nav.Link href="/badFoods">Bad Foods</Nav.Link>
      <Nav.Link href="/reviews">Reviews</Nav.Link>
      <Nav.Link href="/poops">Poops</Nav.Link>


    </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form> */}
    </Navbar>
  )
}
    // <nav className="navbar-custom, text-white flex-md-nowrap p-0 shadow" >

    //   <ul className="nav ">
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/">Home</Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/foods">My Foods</Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/badFoods">Bad Food</Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/reviews">Reviews</Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/poops">Poop</Link>
    //     </li>
    //   </ul>
    // </nav>