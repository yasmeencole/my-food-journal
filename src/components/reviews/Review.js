import React from "react"
import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';


export const Review = ({review}) => {
    return (
    <Card className="review__foodName" style={{ width: '18rem' }}>
    {/* <Card.Img variant="top" src={food.url} /> */}
    <Card.Body>
        <Card.Title>Title: {review.name}</Card.Title>
    <div>Rating: {review.rating}</div>
        <Card.Text>{review.text}</Card.Text>
        <Link to={`/reviews/detail/${review.id}`}>
            <Button>
                Details
            </Button>
        </Link>
    </Card.Body>
    </Card>
)}

