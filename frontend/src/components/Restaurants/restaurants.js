import React, { useEffect } from "react";
import { allRestaurants } from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";
import { showModal, setCurrentModal } from "../../store/modal";
import CreateRestaurantForm from "./CreateRestaurantForm";

function RestaurantsFeed() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const restaurants = useSelector((state) => Object.values(state.restaurants));

  useEffect(() => {
    dispatch(allRestaurants());
  }, [dispatch]);

  const showRestaurantModal = () => {
    dispatch(setCurrentModal(CreateRestaurantForm));
    dispatch(showModal());
  };

  return (
    <>
      <div className="topPage">
        { user ? <div className="createRestBtn">
          <button className="buttonClass" onClick={showRestaurantModal}>Create a Restaurant</button>
        </div> : null}
      </div>
      <div className="restaurantContainer">
        <div></div>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        )).reverse()}
      </div>
    </>
  );
}

export default RestaurantsFeed;
