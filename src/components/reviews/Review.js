import React from "react"
import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import ReactStars from "react-rating-stars-component";



export const Review = ({review}) => {

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    return (
    <Card className="review__foodName" style={{ width: '18rem' }}>
    <Card.Body>
        <Card.Title>{review.food.name}</Card.Title>
    <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  /> 
        <Card.Text>{review.text}</Card.Text>
        <Link to={`/reviews/detail/${review.id}`}>
            <Button>
                Details
            </Button>
        </Link>
    </Card.Body>
    </Card>
)}

