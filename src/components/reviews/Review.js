import React from "react"
import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import ReactStars from "react-rating-stars-component";
import "./Review.css"


// {review} is a prop/parameter
/*
props are how we pass state from component to component. Props can be deconstructed with
{curly brackets} and passed down to the child components 
*/
export const Review = ({review}) => {

    const ratingChanged = (newRating) => {
        // console.log(newRating);
    };
    return (
    <Card className="review__foodName" style={{ width: '25rem' }}>
    <Card.Body>
        <Card.Title>{review.food.name}</Card.Title>
    <ReactStars value={review.rating}
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
/> 
    <br />

        <Card.Text>{review.text}</Card.Text>
    <br />    
        <Link to={`/reviews/detail/${review.id}`}>
            <Button>
                Details
            </Button>
        </Link>
    </Card.Body>
    </Card>
    
)}

