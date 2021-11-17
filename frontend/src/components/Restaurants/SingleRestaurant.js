import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import {loadOneRestaurant} from '../../store/singlerestaurant'
import {useHistory} from 'react-router-dom'
import './singlerestaurant.css'
import { showModal, setCurrentModal } from '../../store/modal'
import EditRestaurantForm from './UpdateRestaurantForm'
import DeleteModal from './DeleteModal'
import {allReviews} from '../../store/reviews'
import ReviewCard from '../Reviews/ReviewCard'


const SingleRestaurant = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(loadOneRestaurant(id))
        dispatch(allReviews())
    }, [dispatch, id])

    const restaurant = useSelector((state) => state.singleRestaurant)
    const reviews = useSelector((state) => Object.values(state.reviews))

    const handleEdit = (e) => {
        dispatch(setCurrentModal(EditRestaurantForm))
        dispatch(showModal())
    }

    const handleDelete = (e) => {
        dispatch(setCurrentModal(DeleteModal))
        dispatch(showModal())
    }

    return(
        <>
        <div>
            <button onClick={handleEdit}>Edit Restaurant</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
        <div>
            <ul>
                {reviews.map((review) => {
                        return (
                            <li key={review.id}> {review.review}
                                {review.rating}
                                {restaurant.name}
                            </li>
                        )
                })}
            </ul>
        </div>
            <div>
            </div>

        </>
    )
}

export default SingleRestaurant
