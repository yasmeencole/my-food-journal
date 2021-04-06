import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom"
import "./Food.css"
import "bootstrap/dist/css/bootstrap.min.css";

// food card that appears for route http://localhost:3000/foods contains: image, food name 
// and details button


// {food} is a prop/parameter
/*
props are how we pass state from component to component. Props can be deconstructed with
{curly brackets} and passed down to the child components 
*/
export const Food = ({food}) => {
    return (
    <Card className="food" style={{ maxWidth: '25rem' }}>
    <Card.Img className="card-img" variant="top" src={food.url}>
        
    </Card.Img>
    <Card.Body>
        <Card.Title>
        <h3>
            {food.name}
        </h3> 
        </Card.Title>

        {/* <Card.Text>{food.description}</Card.Text> */}
        <Link to={`/foods/detail/${food.id}`}>
            <Button>
                Details
            </Button>
        </Link>
    </Card.Body>
    </Card>
)}

