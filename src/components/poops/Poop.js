import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom"


export const Poop = ({poop}) => {
    return (
    <Card className="poop" style={{ width: '18rem' }}>
    <Card.Body>
        <Card.Text>{poop.timestamp}</Card.Text>

        <Card.Title>{poop.note}</Card.Title>
        <Link to={`/poops/detail/${poop.id}`}>
            <Button>
                +
            </Button>
        </Link>
    </Card.Body>
    </Card>
)}
