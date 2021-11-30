import {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
// import { loadOneRestaurant } from "../../store/singlerestaurant";
import ConfirmModal from "../ConfirmModal";
import "./singlerestaurant.css";
import { showModal, setCurrentModal } from "../../store/modal";
import EditRestaurantForm from "./UpdateRestaurantForm";
import DeleteModal from "./DeleteModal";
// import { allReviews } from "../../store/reviews";
import { deleteReview } from "../../store/reviews";
import CreateReviewForm from "../Reviews/CreateReviewForm";
import UpdateReviewForm from "../Reviews/UpdateReviewForm";
import { loadOneReview } from "../../store/singleReview";
import { allUsers } from "../../store/users";

const SingleRestaurant = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    // dispatch(loadOneRestaurant(id));
    // dispatch(allReviews(id));
    dispatch(allUsers());
  }, [dispatch, id]);

  const restaurant = useSelector((state) => state.singleRestaurant);
  const reviews = useSelector((state) => Object.values(state.reviews));
  const handleEdit = (e) => {
    dispatch(setCurrentModal(EditRestaurantForm));
    dispatch(showModal());
  };

  const handleDelete = (e) => {
    dispatch(setCurrentModal(DeleteModal));
    dispatch(showModal());
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
    dispatch(setCurrentModal(ConfirmModal));
    dispatch(showModal());
  };

  const handleEditReview = (review) => {
    dispatch(loadOneReview(review.id));
    dispatch(setCurrentModal(UpdateReviewForm));
    dispatch(showModal());
  };

  const handleCreateReview = (e) => {
    dispatch(setCurrentModal(CreateReviewForm));
    dispatch(showModal());
  };

  const idArr = reviews.map((oneReview) => {
    return oneReview.userId;
  });

  return (
    <>
      <div>
        {idArr.includes(user.id) ? null : (
          <button className="buttonClass" onClick={handleCreateReview}>
            Leave a Review
          </button>
        )}
        {user.id === restaurant.ownerId ? (
          <button className="buttonClass" onClick={handleEdit}>
            Edit Restaurant
          </button>
        ) : null}
        {user.id === restaurant.ownerId ? (
          <button className="buttonClass" onClick={handleDelete}>
            Delete
          </button>
        ) : null}
      </div>
      <>
          <div className="restaurantName">

            <h2> Welcome to {restaurant.name}!</h2>
          </div>
      <div className="topSingle" >
        <img className="singleRestaurantImage" src={restaurant.logo} alt="" />
      </div>
      <div className="SingleCard">
         Address: {restaurant.address}
        <br></br>
        City: {restaurant.city}
        <br></br>
       State: {restaurant.state}
        <br></br>
      </div>
      </>




      <ul className="reviewUl">
        {reviews?.map((review) => {
            return (
                <li key={review.id} className="reviewclass">
              User: {users[review.userId]?.username}
              <br></br>
              Review: {review.review}
              <br></br>
              Rating: {review.rating}/5
              {user.id === review.userId ? (
                  <button
                  type="button"
                  onClick={() => handleDeleteReview(review.id)}
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    height="1em"
                    width="1em"
                    style={{ transform: "rotate(360deg)" }}
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                  </svg>
                </button>
              ) : null}
              {user.id === review.userId ? (
                  <button type="button" onClick={() => handleEditReview(review)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    height="1em"
                    width="1em"
                    style={{ transform: "rotate(360deg)" }}
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                  </svg>
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>


    </>
  );
};

export default SingleRestaurant;
