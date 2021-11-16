import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import {loadOneRestaurant} from '../../store/singlerestaurant'
import {useHistory} from 'react-router-dom'
import './singlerestaurant.css'
import { showModal, setCurrentModal } from '../../store/modal'
import EditRestaurantForm from './UpdateRestaurantForm'

const SingleRestaurant = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(loadOneRestaurant(id))
    }, [dispatch, id])

    const restaurant = useSelector((state) => state.singleRestaurant)

    const handleEdit = (e) => {
        dispatch(setCurrentModal(EditRestaurantForm))
        dispatch(showModal())
    }

    return(
        <>
        <div>
            <button onClick={handleEdit}>Edit Restaurant</button>
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

        </>
    )
}

export default SingleRestaurant
