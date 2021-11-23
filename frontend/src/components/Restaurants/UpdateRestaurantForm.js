import { useDispatch, useSelector } from "react-redux";
import { editOneRestaurant, loadOneRestaurant } from "../../store/singlerestaurant"
import { hideModal } from "../../store/modal";

import { useFormik } from "formik";
import * as yup from "yup";
import './CreateRestaurantForm.css'

const UpdateRestaurantForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session?.user?.id);
  const restaurantId = useSelector((state) => state.singleRestaurant.id)


  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      state: "",
      name: "",
      logo: "",
      ownerId: userId,
    },
    validationSchema: yup.object({
      name: yup.string().min(5).max(50).required("Name must be between 5-50 characters!"),
      address: yup.string().min(5).max(50).required("Address must be between 5-50 characters!"),
      city: yup.string().min(5).max(50).required("City must be between 5-50 characters!"),
      state: yup.string().min(5).max(50).required("State must be between 5-50 characters!"),
      logo: yup.string().url().min(5).max(256).required("Logo must be between 5-256 characters!"),
    }),
    onSubmit: (values) => {
        dispatch(editOneRestaurant(values, restaurantId)).then(() =>
        dispatch(loadOneRestaurant(restaurantId))
        )
        dispatch(hideModal())
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
        <div className="formField">
      <label htmlFor="address">Address</label>
      <input
        id="address"
        name="address"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.address}
      />
      {formik.touched.address && formik.errors.address ? (
        <div className="errorText">{formik.errors.address}</div>
      ) : null}
</div>

    <div className="formField">
      <label htmlFor="city">City</label>
      <input
        id="city"
        name="city"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.city}
      />
      {formik.touched.city && formik.errors.city ? (
        <div className="errorText">{formik.errors.city}</div>
      ) : null}

    </div>

    <div className="formField">
      <label htmlFor="state">State</label>
      <input
        id="state"
        name="state"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.state}
      />
      {formik.touched.state && formik.errors.state ? (
        <div className="errorText">{formik.errors.state}</div>
      ) : null}
    </div>

<div className="formField">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="errorText">{formik.errors.name}</div>
      ) : null}
    </div>

<div className="formField">
      <label htmlFor="logo">Logo</label>
      <input
        id="logo"
        name="logo"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.logo}
      />
      {formik.touched.logo && formik.errors.logo ? (
        <div className="errorText">{formik.errors.logo}</div>
      ) : null}

</div>
<div className="formField">
      <button className="buttonClass" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UpdateRestaurantForm;
