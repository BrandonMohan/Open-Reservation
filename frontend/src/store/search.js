import { csrfFetch } from "./csrf";

const GET_RESTAURANTS = "search/GET_RESTAURANTS";

const getSearchResults = (restaurants) => ({
  type: GET_RESTAURANTS,
  restaurants,
});

export const searchRestaurants = (input) => async (dispatch) => {
    const obj ={ input }
  const res = await csrfFetch(`/api/restaurants/search/all`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  const data = await res.json();
  dispatch(getSearchResults(data));
};

const initialState = {};
export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RESTAURANTS:
        const allRestaurants = {};
        action.restaurants.forEach((restaurant) => {
            allRestaurants[restaurant.id] = restaurant;
        });
    return {...allRestaurants}
    default:
      return state;
  }
}
