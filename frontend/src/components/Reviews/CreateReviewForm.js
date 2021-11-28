import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../store/modal";
import { useFormik } from "formik";
import * as yup from "yup";
import { addOneReview } from "../../store/reviews"
import './reviews.css'


function CreateReviewForm() {
    const dispatch = useDispatch();
    const restaurantId = useSelector((state) => state.singleRestaurant.id)
    const userId = useSelector((state) => state.session.user.id)

    const formik = useFormik({
        initialValues: {
          userId: userId,
          restaurantId: restaurantId,
          review: "",
          rating: 1,
        },
        validationSchema: yup.object({
          review: yup.string().min(5).max(100).required("Review must be between 5-100 characters!"),
          rating: yup.number().min(1).max(5).required("Rating must be a number between 1-5!"),
        }),
        onSubmit: (values) => {
            dispatch(addOneReview(values))
            dispatch(hideModal())
        },
      });

    return (
        <form onSubmit={formik.handleSubmit}>
        <div className="formField">
      <label htmlFor="review">Review</label>
      <input
        id="review"
        name="review"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.review}
      />
      {formik.touched.review && formik.errors.review ? (
        <div className="errorText">{formik.errors.review}</div>
      ) : null}
</div>

    <div className="formField">
      <label htmlFor="rating">Rating</label>
      <select
        id="rating"
        name="rating"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rating}
      >
          <option value="" label="Select a rating" />
          <option value="1" label="1" />
          <option value="2" label="2" />
          <option value="3" label="3" />
          <option value="4" label="4" />
          <option value="5" label="5" />
      </select>
      {formik.touched.rating && formik.errors.rating ? (
        <div className="errorText">{formik.errors.rating}</div>
      ) : null}

    </div>
    <div className="formField">
      <button className="buttonClass" type="submit">Submit</button>
      </div>
    </form>
    )
}

export default CreateReviewForm
