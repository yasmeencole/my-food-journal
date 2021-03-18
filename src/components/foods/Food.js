import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import "./Food.css"


export const Food = ({food}) => {
    return (
    <Card className="food" style={{ width: '18rem' }}>
    <Card.Img variant="top" src={food.image} />
    <Card.Body>
        <Card.Title>{food.name}</Card.Title>
        {/* <Card.Text>{food.description}</Card.Text> */}
        <Button variant="primary">Details</Button>
    </Card.Body>
    </Card>
)}

