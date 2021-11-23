import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { showModal, setCurrentModal, hideModal} from '../../store/modal'
import {deleteRestaurant} from '../../store/restaurants'
import ConfirmModal from '../ConfirmModal'



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
                <button className="buttonClass" onClick={handleDelete}>Delete</button>
                <button className="buttonClass" onClick={handleCancel}>Cancel</button>
            </div>
        </>
    )
}

export default DeleteModal;
