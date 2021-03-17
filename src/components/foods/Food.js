import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";


export const Food = ({food}) => {
    return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={food.image} />
    <Card.Body>
        <Card.Title>{food.name}</Card.Title>
        {/* <Card.Text>{food.description}</Card.Text> */}
        <Button variant="primary">Details</Button>
    </Card.Body>
    </Card>
)}