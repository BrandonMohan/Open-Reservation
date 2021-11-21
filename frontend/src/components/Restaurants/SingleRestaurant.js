import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import {loadOneRestaurant} from '../../store/singlerestaurant'
import ConfirmModal from '../ConfirmModal'
import './singlerestaurant.css'
import { showModal, setCurrentModal } from '../../store/modal'
import EditRestaurantForm from './UpdateRestaurantForm'
import DeleteModal from './DeleteModal'
import {allReviews, editOneReview } from '../../store/reviews'
import { deleteReview } from '../../store/reviews'
import CreateReviewForm from '../Reviews/CreateReviewForm'
import UpdateReviewForm from '../Reviews/UpdateReviewForm'
import { loadOneReview } from '../../store/singleReview'



const SingleRestaurant = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)



    useEffect(() =>{
        dispatch(loadOneRestaurant(id))
        dispatch(allReviews(id))
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

    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReview(reviewId))
        dispatch(setCurrentModal(ConfirmModal))
        dispatch(showModal())
    }

    const handleEditReview = (review) => {
        dispatch(loadOneReview(review.id))
        dispatch(setCurrentModal(UpdateReviewForm))
        dispatch(showModal())
    }

    const handleCreateReview = (e) => {
        dispatch(setCurrentModal(CreateReviewForm))
        dispatch(showModal())
    }

    const idArr = reviews.map((oneReview) => {
       return oneReview.userId
    })


    return(
        <>
        <div>
           { idArr.includes(user.id) ? null : <button onClick={handleCreateReview}>Leave a Review</button>}
            { user.id === restaurant.ownerId ? <button onClick={handleEdit}>Edit Restaurant</button> : null}
            { user.id === restaurant.ownerId ? <button onClick={handleDelete}>Delete</button> : null}
        </div>
        <div className="SingleCard">
                {restaurant?.name}
                <br></br>
                {restaurant.address}
                <br></br>
                {restaurant.city}
                <br></br>
                {restaurant.state}
                <br></br>
        </div>

        <ul>
                    {reviews?.map((review) => {

                        return(
                         <li key={review.id} className="reviewclass">
                             {restaurant.name}
                             <br></br>
                             Review: {review.review}
                             <br></br>
                             Rating: {review.rating}/5
                             { user.id === review.userId ? <button type="button" onClick={()=>handleDeleteReview(review.id)}>Delete</button> : null}
                             { user.id === review.userId ? <button type="button" onClick={()=>handleEditReview(review)}>Edit</button> : null}
                             </li>
                        )
                    })}
                </ul>

        </>
    )
}

export default SingleRestaurant
