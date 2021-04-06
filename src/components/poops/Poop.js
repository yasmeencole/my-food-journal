import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom"

// {poop} is a prop/parameter
/*
props are how we pass state from component to component. Props can be deconstructed with
{curly brackets} and passed down to the child components 
*/
export const Poop = ({poop}) => {
    return (
    <Card className="poop" style={{ width: '18rem' }}>
    <Card.Body>
        <Card.Text>{poop.timestamp}</Card.Text>
<br />
        <Card.Title>{poop.note}</Card.Title>
        <br />
        <Link to={`/poops/detail/${poop.id}`}>
            <Button>
                +
            </Button>
        </Link>
    </Card.Body>
    </Card>
)}
