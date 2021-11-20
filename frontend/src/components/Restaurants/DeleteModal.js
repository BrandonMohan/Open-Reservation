import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { showModal, setCurrentModal, hideModal} from '../../store/modal'
import {deleteRestaurant, getOneRestaurant} from '../../store/restaurants'
import ConfirmModal from '../ConfirmModal'
import { allRestaurants } from '../../store/restaurants'



const DeleteModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const restaurant = useSelector((state) => state.singleRestaurant)


    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(deleteRestaurant(restaurant.id))
            dispatch(setCurrentModal(ConfirmModal))
            dispatch(showModal())
        history.push('/home')
    }

    const handleCancel = (e) => {
        dispatch(hideModal())
    }

    return (
        <>
        <div>
            <h2>Are you sure you want to delete this restaurant?</h2>
        </div>
            <div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </>
    )
}

export default DeleteModal;
