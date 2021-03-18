import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom"
import "./Food.css"


export const Food = ({food}) => {
    return (
    <Card className="food" style={{ width: '18rem' }}>
    <Card.Img variant="top" src={food.image} />
    <Card.Body>
        <Card.Title>{food.name}</Card.Title>
        {/* <Card.Text>{food.description}</Card.Text> */}
        <Link to={`/foods/detail/${food.id}`}>
            <Button>
                Details
            </Button>
        </Link>
    </Card.Body>
    </Card>
)}

