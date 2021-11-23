import {useDispatch} from 'react-redux'
import {hideModal} from '../../store/modal'

const ConfirmModal = () => {
    const dispatch = useDispatch();

    const handleClose = (e) => {
        dispatch(hideModal())
    }
    return (
        <>
            <h1>Confirmed!</h1>
            <button className="buttonClass" onClick={handleClose}>Close</button>
        </>
    )
}

export default ConfirmModal;
