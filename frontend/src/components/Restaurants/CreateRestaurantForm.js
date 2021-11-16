import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addOneRestaurant } from '../../store/restaurants';
import { hideModal } from '../../store/modal'

const CreateRestaurantForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [logo, setLogo] = useState('');
    const userId = useSelector((state) => state.session?.user?.id)

    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateLogo = (e) => setLogo(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload ={
            name,
            address,
            city,
            state,
            logo,
            ownerId: userId
        }
         dispatch(addOneRestaurant(payload, userId))
         dispatch(hideModal())
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                type="text"
                placeholder="Restaurant Name"
                value={name}
                onChange={updateName}
                />
                <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={updateAddress}
                />
                <input
                type="text"
                placeholder="City"
                value={city}
                onChange={updateCity}
                />
                <input
                type="text"
                placeholder="State"
                value={state}
                onChange={updateState}
                />
                <input
                type="text"
                placeholder="Logo"
                value={logo}
                onChange={updateLogo}
                />
            </div>
            <button >Create Restaurant</button>
        </form>
    )
}

export default CreateRestaurantForm
