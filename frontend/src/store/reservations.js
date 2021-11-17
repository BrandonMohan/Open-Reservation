import {csrfFetch, csrfToken} from './csrf'
import Cookies from 'js-cookie'
const GET_RESERVATIONS = 'reservations/GET_RESERVATONS'


const getReservations = (reservations) => {
    return {
        type: GET_RESERVATIONS,
        reservations
    }
}

export const allReservations = (reservations) => async (dispatch) => {
    const res = await csrfFetch('/api/reservations')
    const data = await res.json()
    dispatch(getReservations(data))
}


const initialState = {}
export default function reservationReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RESERVATIONS:
            const allReservations = {}
            Object.values(action.reservations).forEach((reservation) =>{
                allReservations[reservation.id] = reservation
            })
            return { ...state, ...allReservations }
        default:
            return state;
    }
}
